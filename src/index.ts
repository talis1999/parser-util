import { get } from "lodash";
import createSchema from "./utils/createSchema";
import dataParser, { Data } from "./utils/dataParser";
// get(object, path, [defaultValue]) - Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.

const ownerSchema = createSchema({
  name: "n",
  lastName: "ln",
  role: "roles[0].title",
});

const phoneAccessorieSchema = createSchema(
  { id: "id", name: "accessorie" },
  "pa"
);

const phoneItemSchema = createSchema(
  {
    id: "id",
    noAccessOutsideOfLinkedArraysScope: "ln",
    accessories: phoneAccessorieSchema,
  },
  "p"
);

const phoneStoreSchema = createSchema({
  owner: ownerSchema,
  phones: phoneItemSchema,
});

const mockData: Data = {
  p: [
    {
      id: 1,
      pa: [
        { id: 1, accessorie: "headphones" },
        { id: 2, accessorie: "charger", someExtraData: "bla" },
      ],
    },
    { id: 2, e: 6 },
  ],
  n: "alex",
  ln: "talisman",
  roles: [
    {
      id: 1,
      title: "store-owner",
    },
  ],
};

const example = dataParser(mockData, phoneStoreSchema);

console.log("/////////////////////////");
console.log("Phone store--");
console.log(example);

console.log("/////////////////////////");
console.log("First phone accesories--");
console.log(get(example, "phones[0].accessories"));
