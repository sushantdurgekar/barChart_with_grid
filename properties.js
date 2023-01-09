// JavaScript
define(["qlik"], function (qlik) {
  return {
    type: "items",
    component: "accordion",
    items: {
      Data: {
        label: "Data",
        items: {
          dimensions: {
            label: "Dimensions",
            uses: "dimensions",
            min: 1,
            max: 2,
          },
          measures: {
            label: "Measures",
            uses: "measures",
            min: 1,
            max: 3,
          },
        },
      },
      sorting: {
        uses: "sorting",
      },
      settings: {
        uses: "settings",
        items: {
          X_YAxis: {
            label: "X-Y Axis",
            // component: "accordion",
            items: {
              x_y_AxisLabel: {
                type: "string",
                label: "X-Y axis Label",
                component: "buttongroup",
                ref: "myproperties.x_y_AxisLabel",
                options: [
                  {
                    value: "bold",
                    label: "Bold",
                    tooltip: "Select for Bold",
                  },
                  {
                    value: "italic",
                    label: "Italic",
                    tooltip: "Select for Italic",
                  },
                  {
                    value: "both",
                    label: "Both",
                    tooltip: "Select for Bold and Italic",
                  },
                  {
                    value: "none",
                    label: "None",
                    tooltip: "Select for None",
                  },
                ],
                defaultValue: "none",
              },
              yAxisPos: {
                type: "string",
                component: "dropdown",
                label: "Y-axis Position",
                ref: "myproperties.positionY",
                options: [
                  {
                    value: "left",
                    label: "Left",
                  },
                  {
                    value: "right",
                    label: "Right",
                  },
                ],
                defaultValue: "left",
              },
              yAxisColor: {
                label: "Y-Axis Color",
                component: "color-picker",
                ref: "yAxisColor",
                type: "object",
                defaultValue: {
                  color: "000000",
                  index: "-1",
                },
              },
              yScale: {
                type: "string",
                component: "dropdown",
                label: "Y-axis Scaling",
                ref: "myproperties.scalingY",
                options: [
                  {
                    value: "wide",
                    label: "Wide",
                  },
                  {
                    value: "medium",
                    label: "Medium",
                  },
                  {
                    value: "narrow",
                    label: "Narrow",
                  },
                ],
                defaultValue: "medium",
              },
              yAxisLabelSize: {
                type: "number",
                component: "slider",
                label: "Y-Axis Label Size",
                ref: "myproperties.yAxisLabelSize",
                min: 7,
                max: 32,
                step: 1,
                defaultValue: 18,
              },
              xAxisPos: {
                type: "string",
                component: "dropdown",
                label: "X-axis Position",
                ref: "myproperties.positionX",
                options: [
                  {
                    value: "top",
                    label: "Top",
                  },
                  {
                    value: "bottom",
                    label: "Bottom",
                  },
                ],
                defaultValue: "bottom",
              },
              xAxisColor: {
                label: "X-Axis Color",
                component: "color-picker",
                ref: "xAxisColor",
                type: "object",
                defaultValue: {
                  color: "000000",
                  index: "-1",
                },
              },
              xAxisTickLable: {
                type: "string",
                component: "dropdown",
                label: "X-axis Label orientation",
                ref: "myproperties.LorientationX",
                options: [
                  {
                    value: "tilted",
                    label: "Tilted",
                  },
                  {
                    value: "horizontal",
                    label: "Horizontal",
                  },
                  {
                    value: "auto",
                    label: "Auto",
                  },
                ],
                defaultValue: "auto",
              },
              xAxisLabelSize: {
                type: "number",
                component: "slider",
                label: "X-Axis Label Size",
                ref: "myproperties.xAxisLabelSize",
                min: 7,
                max: 32,
                step: 1,
                defaultValue: 18,
              },
            },
          },
          MyTooltip: {
            label: "Tooltip",
            // component: "accordion",
            items: {
              MyTooltipSwitch: {
                type: "boolean",
                label: "Tooltip",
                component: "switch",
                ref: "tooltipSwitch",
                options: [
                  {
                    value: true,
                    label: "Basic",
                  },
                  {
                    value: false,
                    label: "Custom",
                  },
                ],
                defaultValue: true,
              },
              tooltipChart: {
                type: "string",
                label: "Chart",
                component: "dropdown",
                ref: "tooltipChart.classify",
                options: [
                  {
                    value: "cityBarchart",
                    label: "City barchart",
                    tooltip: "Select for City barchart",
                  },
                  {
                    value: "sales$ByStates",
                    label: "Sales by states",
                    tooltip: "Select for Sales by states",
                  },
                  {
                    value: "marginByMonth",
                    label: "Margin by month",
                    tooltip: "Select for Margin by month",
                  },
                  {
                    value: "filterBySalesRep",
                    label: "Filter by Sales Rep",
                    tooltip: "Select for Filter by Sales Rep",
                  },
                ],
                defaultValue: "cityBarchart",
                show: function (e) {
                  if (!e.tooltipSwitch) return true;
                  else return false;
                },
              },
              tooltipImage: {
                label: "Image",
                component: "media",
                ref: "myImage.src",
                layoutRef: "myImage.src",
                type: "string",
                show: function (e) {
                  if (!e.tooltipSwitch) return true;
                  else return false;
                },
              },
            },
          },
          Chart: {
            label: "Chart",
            items: {
              chartLabel: {
                type: "string",
                label: "Chart Heading",
                component: "buttongroup",
                ref: "myproperties.chartHeading",
                options: [
                  {
                    value: "bold",
                    label: "Bold",
                    tooltip: "Select for Bold",
                  },
                  {
                    value: "italic",
                    label: "Italic",
                    tooltip: "Select for Italic",
                  },
                  {
                    value: "both",
                    label: "Both",
                    tooltip: "Select for Bold and Italic",
                  },
                  {
                    value: "none",
                    label: "None",
                    tooltip: "Select for None",
                  },
                ],
                defaultValue: "none",
              },
              BarColor: {
                type: "string",
                component: "dropdown",
                label: "Bar Color",
                ref: "barColor.colors.by",
                options: [
                  {
                    label: "By Single",
                    value: "single",
                  },
                  {
                    label: "By Dimension",
                    value: "dimension",
                  },
                  {
                    label: "By Measure",
                    value: "measure",
                  },
                ],
                defaultValue: "single",
              },
              MyColorPicker: {
                label: "Select Color",
                component: "color-picker",
                ref: "barColor.colors.myColor",
                type: "object",
                defaultValue: {
                  color: "006580",
                  index: "-1",
                },
                show: function (e) {
                  // console.log(e);
                  if (e.barColor.colors.by === "dimension") return false;
                  else return true;
                },
              },
              BarOpacity: {
                type: "number",
                component: "slider",
                label: "Bar Opacity",
                ref: "myproperties.barOpacity",
                min: 0.3,
                max: 1,
                step: 0.05,
                defaultValue: 0.95,
              },
              GridFormate: {
                label: "Grid",
                items: {
                  MyGridSwitch: {
                    type: "boolean",
                    label: "Grid",
                    component: "switch",
                    ref: "gridSwitch",
                    options: [
                      {
                        value: true,
                        label: "On",
                      },
                      {
                        value: false,
                        label: "Off",
                      },
                    ],
                    defaultValue: true,
                  },
                  gridScale: {
                    type: "string",
                    component: "dropdown",
                    label: "Grid Scaling",
                    ref: "myproperties.gridScaling",
                    options: [
                      {
                        value: "wide",
                        label: "Wide",
                      },
                      {
                        value: "medium",
                        label: "Medium",
                      },
                      {
                        value: "narrow",
                        label: "Narrow",
                      },
                    ],
                    defaultValue: "medium",
                  },
                  gridLineFormate: {
                    type: "string",
                    component: "dropdown",
                    label: "Grid Line Formatting",
                    ref: "myproperties.gridLineFormate",
                    options: [
                      {
                        value: "dashed",
                        label: "Dashed",
                      },
                      {
                        value: "dotted",
                        label: "Dotted",
                      },
                      {
                        value: "line",
                        label: "Line",
                      },
                    ],
                    defaultValue: "line",
                  },
                  GridOpacity: {
                    type: "number",
                    component: "slider",
                    label: "Grid Opacity",
                    ref: "myproperties.gridOpacity",
                    min: 0.1,
                    max: 1,
                    step: 0.05,
                    defaultValue: 0.35,
                  },
                },
              },
              LegendOption: {
                label: "Legend",
                items: {
                  MyLegendSwitch: {
                    type: "boolean",
                    label: "Legend",
                    component: "switch",
                    ref: "legend.legendSwitch",
                    options: [
                      {
                        value: true,
                        label: "On",
                      },
                      {
                        value: false,
                        label: "Off",
                      },
                    ],
                    defaultValue: false,
                  },
                  legendPos: {
                    type: "string",
                    component: "dropdown",
                    label: "Legend Position",
                    ref: "legend.legendPos",
                    options: [
                      {
                        value: "top",
                        label: "Top",
                      },
                      {
                        value: "bottom",
                        label: "Bottom",
                      },
                      {
                        value: "left",
                        label: "Left",
                      },
                      {
                        value: "right",
                        label: "Right",
                      },
                    ],
                    defaultValue: "right",
                    show: function (e) {
                      if (e.legend.legendSwitch) return true;
                      else return false;
                    },
                  },
                },
                show: function (e) {
                  // console.log(e);
                  if (
                    e.barColor.colors.by === "dimension" ||
                    e.barColor.colors.by === "measure"
                  )
                    return true;
                  else return false;
                },
              },
              ValueLabels: {
                label: "Value Labels",
                items: {
                  MyValueLabelSwitch: {
                    type: "boolean",
                    label: "Value Label",
                    component: "switch",
                    ref: "valueLabelSwitch",
                    options: [
                      {
                        value: true,
                        label: "On",
                      },
                      {
                        value: false,
                        label: "Off",
                      },
                    ],
                    defaultValue: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  };
});
