export const filtersToInclude = [
  {
    name: "category",
    include: true,
  },
  {
    name: "availability",
    include: true,
  },
  {
    name: "fabric-type",
    include: true,
  },
  {
    name: "fabric-weight",
    include: false,
  },
  {
    name: "features",
    include: false,
  },
  {
    name: "fit",
    include: true,
  },
];

export const filterOrder = [
  {
    name: "category",
    order: 1,
  },
  {
    name: "availability",
    order: 3,
  },
  {
    name: "fabric-type",
    order: 4,
  },
  {
    name: "fabric-weight",
    order: 999999999, //currently excluded above
  },
  {
    name: "features",
    order: 999999999, //currently excluded above
  },
  {
    name: "fit",
    order: 2,
  },
];
