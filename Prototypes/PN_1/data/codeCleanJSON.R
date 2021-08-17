# Set up ----
{
  library(tidyverse)
  library(readxl)
  library(janitor)
  library(jsonlite)
  library(glue)
  load("df_simulate_output.rdata")
  xwalk_policy = read_excel(path = "Lit Review Matrix - Upstream Policies and Health Outcomes 6-28-21.xlsx",
                            sheet = "policy group") %>% 
    clean_names() %>% 
    select(policy = policy_short, policy_group)
  
  df_sim_raw = df_simulate_output %>% 
    clean_names() %>% 
    left_join(xwalk_policy)
  
}

# Donut  Data-----
# ___ Policy ----- 
{
  df_donut_policy = df_sim_raw %>% 
    count(policy_group) %>% 
    arrange(desc(n))
  array_donut_policy = df_donut_policy %>% toJSON(dataframe = 'values')
  js_donut_policy =  glue("const dataDonutPolicy =  {array_donut_policy}; export default dataDonutPolicy;")
  write(js_donut_policy, file = "../modules/data/data_donut_policy.js")
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
  ### Write to JS
  object_donut_outcomes = df_donut_links %>% toJSON()
  array_donut_outcomes_defaut = df_donut_links %>% 
    filter(policyGroup == "None",
           outcome == "None") %>% 
    select(link, n) %>% 
    toJSON(dataframe = 'values')
  js_donut_links_object = glue("export const dataDonutLinks =  {array_donut_outcomes};")
  js_donut_links_default = glue("export const dataDonutLinksDefault =  {array_donut_outcomes_defaut};")
  js_donut_links = paste(js_donut_links_default,js_donut_links_object)
  write(js_donut_links, file = "../modules/data/data_donut_links.js")
}

# ___ Outcomes -----
{
  df_donut_outcomes = df_sim_raw %>% 
    count(outcome) %>% 
    arrange(desc(n))
  array_donut_outcomes = df_donut_outcomes %>% toJSON(dataframe = 'values')
  js_donut_outcomes = glue("const dataDonutOutcomes =  {array_donut_outcomes}; export default dataDonutOutcomes;")
  write(js_donut_outcomes, file = "../modules/data/data_donut_outcomes.js")
}