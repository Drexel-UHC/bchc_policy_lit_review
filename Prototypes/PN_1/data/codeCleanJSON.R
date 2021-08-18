# Set up ----
{
  library(tidyverse)
  library(readxl)
  library(janitor)
  library(jsonlite)
  library(glue)
  library(RColorBrewer)
  ## Load Utilities
  source("codeCleanUtil.R")
  
  ## Load Data
  load("df_simulate_output.rdata")
  
  ## Load Policy categories/groups
  xwalk_policy = read_excel(path = "Lit Review Matrix - Upstream Policies and Health Outcomes 6-28-21.xlsx",
                            sheet = "policy group") %>% 
    clean_names() %>% 
    select(policy = policy_short, policy_group)
  df_sim_raw = df_simulate_output %>% 
    clean_names() %>% 
    left_join(xwalk_policy)
  
  ## Global Vars
  policyPallete = "YlGnBu"
  linkGreen = "#1a9850" #https://colorbrewer2.org/#type=diverging&scheme=RdYlGn&n=11
  linkRed = "#d73027"
}

# Donut  Data-----
# ___ Policy ----- 
{
  ## Data
  df_donut_policy = df_sim_raw %>% 
    count(policy_group) %>% 
    arrange(desc(n))
  array_donut_policy = df_donut_policy %>% toJSON(dataframe = 'values')
  
  ## Color Pallete (Array of Object)
  nBinsPolicy = nrow(df_donut_policy)
  display.brewer.pal(nBinsPolicy+2,policyPallete)
  policy_colors = brewer.pal(nBinsPolicy+2,policyPallete) 
  df_policy_fill = tibble(policy_group = df_donut_policy$policy_group,
                          fill = rev( policy_colors[3:(3+nBinsPolicy-1)]))
  array_donut_PolicyFill = df_policy_fill %>% 
    pivot_wider(names_from = 1, values_from = fill) %>% 
    toJSON() 
  obj_donut_PolicyFill = glue("{array_donut_PolicyFill}[0]")
  
  ## Write to JS
  js_donut_policy_data =  toJS(array_donut_policy,"dataDonutPolicy")
  js_donut_policy_fill = toJS(obj_donut_PolicyFill,"dataDonutPolicyFill")
  data_donut_policy = glue_collapse(list(js_donut_policy_data,js_donut_policy_fill))
  write(data_donut_policy, file = "../modules/data/data_donut_policy.js")
  
}


# ___ Links -----
{
  ### Create template for all filter combinations
  policyGroupFiltersAll = c("None",unique(xwalk_policy$policy_group))
  outcomeFiltersAll = c("None",unique(df_sim_raw$outcome))
  template_links = tibble(policyFilter = policyGroupFiltersAll ,
                          outcomeFilter = list(outcomeFiltersAll)) %>% 
    unnest(cols = outcomeFilter)
  ### Count links for each combination
  df_donut_links = template_links %>% 
    mutate(grouperTmp = paste(policyFilter, outcomeFilter)) %>% 
    group_by(grouperTmp) %>% 
    group_modify(~{
      policyTmp = .x$policyFilter
      if (policyTmp == "None"){policyTmp = unique(df_sim_raw$policy_group)}
      outcomeTmp = .x$outcomeFilter
      if (outcomeTmp == "None"){outcomeTmp = unique(df_sim_raw$outcome)}
      df_sim_raw %>% 
        filter(policy_group%in%policyTmp,
               outcome%in%outcomeTmp) %>%
        count(link) %>% 
        mutate(policyGroup = .x$policyFilter,
               outcome = .x$outcomeFilter)
    }) %>% 
    ungroup() %>% 
    select(policyGroup, outcome, link, n)
  array_donut_outcomes_defaut = df_donut_links %>% 
    filter(policyGroup == "None",
           outcome == "None") %>% 
    select(link, n) %>% 
    toJSON(dataframe = 'values')
  object_donut_outcomes = df_donut_links %>% toJSON()
  
  ## Color Pallete (Array of Object)
  df_links_fill =  df_donut_links %>% 
    count(link) %>% 
    mutate(fill = link %>% recode("Negative"= linkRed,
                                  "Positive"= linkGreen)) %>% 
    select(link, fill)
  array_donut_LinksFill = df_links_fill %>% 
    pivot_wider(names_from = 1, values_from = fill) %>% 
    toJSON() 
  obj_donut_LinksFill= glue("{array_donut_LinksFill}[0]")
  
  ### Write to JS
  js_donut_links_object = toJS(object_donut_outcomes,"dataDonutLinks")
  js_donut_links_default = toJS(array_donut_outcomes_defaut,"dataDonutLinksDefault")  
  js_donut_links_fill = toJS(obj_donut_LinksFill,"dataDonutLinksFill")
  js_donut_links = glue_collapse(list(js_donut_links_default,js_donut_links_object,js_donut_links_fill))
  write(js_donut_links, file = "../modules/data/data_donut_links.js")
}

# ___ Outcomes -----
{
  ### Data
  df_donut_outcomes = df_sim_raw %>% 
    count(outcome) %>% 
    arrange(desc(n))
  array_donut_outcomes = df_donut_outcomes %>% toJSON(dataframe = 'values')
  
  ### Write to JS
  js_donut_outcomes_data = toJS(array_donut_outcomes,"dataDonutOutcomes")
  js_donut_links = glue_collapse(list(js_donut_outcomes_data))
  write(js_donut_links, file = "../modules/data/data_donut_outcomes.js")
}
