import createSchema from "./utils/createSchema";
import dataParser from "./utils/dataParser";

const personSchema = createSchema({
  name: "c",
  lastName: "d",
});

const arrItemSchema = createSchema(
  {
    itemName: "i",
  },
  "inner"
);

const itemSchema = createSchema(
  {
    id: "b",
    unavaliableDataExample: "../c",
    arr: arrItemSchema,
  },
  "a"
);

const mainSchema = createSchema({
  person: personSchema,
  items: itemSchema,
});

const example = dataParser(
  {
    a: [
      { b: "2", inner: [{ i: 1 }] },
      { b: "4", e: 6 },
    ],
    c: "alex",
    d: "talisman",
  },
  mainSchema
);

console.log(JSON.stringify(example));
