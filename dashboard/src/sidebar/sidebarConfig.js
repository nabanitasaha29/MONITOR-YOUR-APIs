import farmerRegistry from "../API_config_files/sidebar/farmerRegistry.json";
import mapperList from "../API_config_files/sidebar/mapperList.json";
import dcsList from "../API_config_files/sidebar/dcsList.json";
import dpeList from "../API_config_files/sidebar/dpeList.json";

export const sidebarConfig = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: "Home",
        type: "link",
        to: "/dashboard"
    },

    {
        id: "groups",
        label: "Groups",
        icon: "Layers",
        type: "group",
        children: [
            {
                id: "farmer-registry",
                label: "Farmer Registry APIs",
                type: "dynamic-list",
                children: farmerRegistry,
                base: "/groups/farmer-registry"
            },

            {
                id: "mapper",
                label: "Mapper APIs",
                type: "dynamic-list",
                children: mapperList,
                base: "/groups/mapper"
            },

            {
                id: "dcs",
                label: "DCS APIs",
                type: "dynamic-list",
                children: dcsList,
                base: "/groups/dcs"
            },

            {
                id: "dpe",
                label: "DPE APIs",
                type: "dynamic-list",
                children: dpeList,
                base: "/groups/dpe"
            }
        ]
    },

    {
        id: "settings",
        label: "Settings",
        icon: "Settings",
        type: "link",
        to: "/settings"
    }
];