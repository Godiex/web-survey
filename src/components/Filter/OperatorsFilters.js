const operators = [
  {
    name: "Igual a",
    operator: "eq",
    typeValid: ["string", "number", "boolean", "date", "dateTime", "custom"],
  },
  {
    name: "Diferente a",
    operator: "neq",
    typeValid: ["string", "number", "boolean", "date", "dateTime", "custom"],
  },
  {
    name: "Menor que",
    operator: "lt",
    typeValid: ["number", "date", "dateTime"],
  },
  {
    name: "Menor o igual a",
    operator: "lte",
    typeValid: ["number", "date", "dateTime"],
  },
  {
    name: "Mayor que",
    operator: "gt",
    typeValid: ["number", "date", "dateTime"],
  },
  {
    name: "Mayor o igual a",
    operator: "gte",
    typeValid: ["number", "date", "dateTime"],
  },
  {
    name: "Que inicie con",
    operator: "startswith",
    typeValid: ["string"],
  },
  {
    name: "Que termine en",
    operator: "endswith",
    typeValid: ["string"],
  },
  {
    name: "Que contenga",
    operator: "contains",
    typeValid: ["string"],
  },
];
export default operators;
