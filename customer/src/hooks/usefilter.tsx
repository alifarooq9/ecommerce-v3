import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

const useFilter = () => {
  //router
  const router = useRouter();

  //filter
  const [filters, setFilter] = useState([
    {
      id: "color",
      name: "Color",
      options: [
        {
          value: "white",
          label: "White",
          checked: router.query.color?.includes("white") ? true : false,
        },
        {
          value: "beige",
          label: "Beige",
          checked: router.query.color?.includes("beige") ? true : false,
        },
        {
          value: "blue",
          label: "Blue",
          checked: router.query.color?.includes("blue") ? true : false,
        },
        {
          value: "brown",
          label: "Brown",
          checked: router.query.color?.includes("brown") ? true : false,
        },
        {
          value: "green",
          label: "Green",
          checked: router.query.color?.includes("green") ? true : false,
        },
        {
          value: "purple",
          label: "Purple",
          checked: router.query.color?.includes("purple") ? true : false,
        },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: [
        {
          value: "new-arrivals",
          label: "New Arrivals",
          checked: router.query.category?.includes("new-arrivals")
            ? true
            : false,
        },
        {
          value: "sale",
          label: "Sale",
          checked: router.query.category?.includes("sale") ? true : false,
        },
        {
          value: "travel",
          label: "Travel",
          checked: router.query.category?.includes("travel") ? true : false,
        },
        {
          value: "organization",
          label: "Organization",
          checked: router.query.category?.includes("organization")
            ? true
            : false,
        },
        {
          value: "accessories",
          label: "Accessories",
          checked: router.query.category?.includes("accessories")
            ? true
            : false,
        },
      ],
    },
    {
      id: "size",
      name: "Size",
      options: [
        {
          value: "2l",
          label: "2L",
          checked: router.query.size?.includes("2l") ? true : false,
        },
        {
          value: "6l",
          label: "6L",
          checked: router.query.size?.includes("6l") ? true : false,
        },
        {
          value: "12l",
          label: "12L",
          checked: router.query.size?.includes("12l") ? true : false,
        },
        {
          value: "18l",
          label: "18L",
          checked: router.query.size?.includes("18l") ? true : false,
        },
        {
          value: "20l",
          label: "20L",
          checked: router.query.size?.includes("20l") ? true : false,
        },
        {
          value: "40l",
          label: "40L",
          checked: router.query.size?.includes("40l") ? true : false,
        },
      ],
    },
  ]);

  // handle apply filters
  const handleApplyFilters = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const colorQuery: string[] = [];
    const sizeQuery: string[] = [];
    const categoryQuery: string[] = [];
    filters.map((f) => {
      f.options.map((o) => {
        if (f.id === "color" && o.checked) {
          colorQuery.push(o.value);
        }
        if (f.id === "category" && o.checked) {
          categoryQuery.push(o.value);
        }
        if (f.id === "size" && o.checked) {
          sizeQuery.push(o.value);
        }
      });
    });

    router.push({
      pathname: "/store",
      query: {
        color: colorQuery,
        size: sizeQuery,
        category: categoryQuery,
      },
    });
  };

  //on change filter
  const onChangeFilter = (
    e: ChangeEvent<HTMLInputElement>,
    sectionId: string
  ) => {
    const temp = [...filters];

    temp.map((f) => {
      if (f.id === sectionId) {
        f.options.map((o) => {
          if (o.value === e.target.value) {
            o.checked = o.checked ? false : true;
          }
        });
      }
    });

    setFilter(temp);
  };

  return { onChangeFilter, filters, setFilter, handleApplyFilters };
};

export default useFilter;
