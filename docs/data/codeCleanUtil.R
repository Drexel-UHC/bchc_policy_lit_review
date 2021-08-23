## Creates exportable JS data
### arg1: data
### arg2: object name
require(glue)
toJSExport = function(data, objName){glue("export const {objName} =  {data};")}
 