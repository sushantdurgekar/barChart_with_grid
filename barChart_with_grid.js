define([
  "jquery",
  //mashup and extension interface
  "qlik",
  "https://d3js.org/d3.v7.min.js",
  "css!./barChart_with_grid.css",
], function ($, qlik, d3) {
  let colorS, prevColor;
  let colorA = [];

  for (let i = 0; i < 100; i++) {
    if (i === 0) prevColor = "000000";
    else prevColor = colorS;
    colorS = [...Array(6)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");
    while (colorS == prevColor) {
      colorS = [...Array(6)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");
      // console.log(colorS);
    }
    colorA.push(`#${colorS}`);
  }
  // console.log(colorA);
  var color = d3.scaleOrdinal().range([...colorA]);
  // console.log(color(8));

  return {
    initialProperties: {
      qHyperCubeDef: {
        qDimensions: [],
        qMeasures: [],
        qInitialDataFetch: [
          {
            qWidth: 2,
            qHeight: 100,
          },
        ],
      },
    },
    definition: {
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
                // barColorSingleM: {
                //   label: "Color",
                //   component: "color-picker",
                //   ref: "barColor.colors.myColor",
                //   type: "object",
                //   defaultValue: {
                //     color: "006580",
                //     index: "-1",
                //   },
                //   // show: console.log(),
                //   show: function (layout) {
                //     console.log(layout);
                //     if (layout.barColor.colors === ("single" || "measure"))
                //       return true;
                //     return false;
                //   },
                // },
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
    },
    support: {
      snapshot: true,
      export: true,
      exportData: false,
    },
    paint: function ($element, layout) {
      // console.log($element, layout);
      $element.html(
        `<div id="${layout.qInfo.qId}" style="height:100%">
          <div id="${layout.qInfo.qId}_chart" class="chartGrid">
            <div id="${layout.qInfo.qId}_chart_yLabel" style="grid-area:yLabel1">
            </div>
            <div id="${layout.qInfo.qId}_chart_yAxis" style="grid-area:yAxis1">
            </div>
            <div id="${layout.qInfo.qId}_chart_main" style="grid-area:mainChart">
            </div>
            <div id="${layout.qInfo.qId}_chart_xAxis" style="grid-area:xAxis1">
            </div>
            <div id="${layout.qInfo.qId}_chart_xLabel" style="grid-area:xLabel1">
            </div>
            <div id="${layout.qInfo.qId}_chart_legend" style="grid-area:legend">
            </div>
          </div>
        </div>`
      );
      //add your rendering code here

      // console.log(layout);
      // console.log(
      //   layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText,
      //   layout.qHyperCube.qDataPages[0].qMatrix[0][1].qNum
      // );
      // console.log(
      //   layout.qHyperCube.qDataPages[0].qMatrix.map((d) => [
      //     d[0].qText,
      //     d[1].qNum,
      //   ])
      // );
      let dataSet1 = layout.qHyperCube.qDataPages[0].qMatrix.map((d) => [
        d[1].qNum,
        d[0].qText,
      ]);

      // console.log(dataSet1);

      // const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
      // const dataset = [
      //   { value: 12, lable: "cat" },
      //   { value: 31, lable: "dog" },
      //   { value: 22, lable: "mouse" },
      //   { value: 17, lable: "cow" },
      //   { value: 25, lable: "buffalo" },
      //   { value: 18, lable: "pig" },
      //   { value: 29, lable: "hen" },
      //   { value: 9, lable: "horse" },
      // ];

      // let w = $element.width();
      // let h = $element.height();
      // console.log(
      //   $element[0].children.nJSMh.children[0].children[2].scrollHeight,
      //   $element[0].children.nJSMh.children[0].children[2].scrollWidth
      // );
      let w = $element[0].children[0].children[0].children[2].scrollWidth;
      let h = $element[0].children[0].children[0].children[2].scrollHeight;
      let padding = w / 10;
      console.log(layout, $element);

      const svg = d3
        .select("#" + layout.qInfo.qId + "_chart_main")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

      const xScale = d3
        .scaleBand()
        .domain(dataSet1.map((d) => d[1]))
        .range([0, w]);
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataSet1, (d) => d[0]) * 1.5])
        .range([h, 0]);

      //Tooltip

      // ----------------
      // Create a tooltip
      // ----------------
      var tooltip = d3
        // var tooltip = svg
        .select("#" + layout.qInfo.qId)

        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("position", "fixed")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px");
      // console.log("zgfz");

      var mouseover = function (e, d) {
        // console.log("zgviukiv");
        // console.log(e, d);
        if (layout.tooltipSwitch) {
          tooltip.html(
            ` ${layout.qHyperCube.qDimensionInfo[0].qFallbackTitle} : ${d[1]} <br>  ${layout.qHyperCube.qMeasureInfo[0].qFallbackTitle} : ${d[0]}`
          );
        } else {
          tooltip.html(
            ` ${layout.qHyperCube.qDimensionInfo[0].qFallbackTitle} : ${d[1]} <br>  ${layout.qHyperCube.qMeasureInfo[0].qFallbackTitle} : ${d[0]} <br> <div id="chartTooltip" style="height:50px;"></div> <br> <br> <div id="chartTooltip1" style="height:100px;"></div> <br>`
            // <img src="${layout.myImage.src}" alt="image" width="90" height="60">`
          );
          // Chart Visualisation
          qlik
            .currApp()
            .visualization.get("Jkks")
            // .create("barchart", ["NetScoreName", "=Count(NetScoreName)"], {
            //   showTitles: true,
            //   title: "Net scores",
            // })
            .then(function (vis) {
              // console.log(vis);
              vis.show("chartTooltip");
            });
          qlik
            .currApp()
            .visualization.create("barchart", ["City", "=Count(City)"], {
              showTitles: true,
              title: "City",
            })
            .then(function (vis) {
              vis.show("chartTooltip1");
            });
        }

        // tooltip.style("left", e.clientX + "px").style("top", e.clientY + "px");
      };
      var mousemove = function (e) {
        // console.log(e);
        if (layout.tooltipSwitch) {
          tooltip.transition().duration(20).style("opacity", 1);
          // select("#" + layout.qInfo.qId + " g.tooltip").attr(
          //   "transform-origin",
          //   "translate(" +
          //     e.toElement.x.animVal.value +
          //     "," +
          //     e.toElement.y.animVal.value +
          //     ")"
          // );
          tooltip
            .style("left", e.clientX + "px")
            .style("top", e.clientY + "px");
          // tooltip
          //   .style("left", e.toElement.x.animVal.value + "px")
          //   .style("top", e.toElement.y.animVal.value + "px");
        } else {
          tooltip.transition().duration(20).style("opacity", 1);
          // select("#" + layout.qInfo.qId + " g.tooltip").attr(
          //   "transform-origin",
          //   "translate(" +
          //     e.toElement.x.animVal.value +
          //     "," +
          //     e.toElement.y.animVal.value +
          //     ")"
          // );
          tooltip
            .style("left", e.clientX + "px")
            .style("top", e.clientY + "px");
          // tooltip
          //   .style("left", e.toElement.x.animVal.value + "px")
          //   .style("top", e.toElement.y.animVal.value + "px");
        }

        // .style("transform", "translateY(-55%)")
      };

      var mouseleave = (d) => tooltip.style("opacity", 0);

      svg
        .selectAll("rect")
        .data(dataSet1)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(d[1]) + xScale.bandwidth() / 4)

        .attr("y", (d, i) => yScale(d[0]))
        .attr("width", xScale.bandwidth() / 1.5)
        .attr("height", (d, i) => h - yScale(d[0]))
        .attr("fill", (d, i) => {
          if (d[1] === "-") {
            return "#dcdcdc";
          } else {
            if (layout.barColor.colors.by == "single") {
              // console.log(i, color(i));
              return layout.barColor.colors.myColor.color;
              // return layout.myColor.color;
              // return color;
            } else if (layout.barColor.colors.by == "dimension") {
              // console.log(i, color(i));

              // return `#${colorS}`;
              return `${color(i)}`;
            } else if (layout.barColor.colors.by == "measure") {
              let mColor = layout.barColor.colors.myColor.color;
              // console.log(
              //   mColor,
              //   mColor.substr(1, 2),
              //   parseInt(mColor.substr(1, 2), 16)
              // );
              return `rgb(${parseInt(mColor.substr(1, 2), 16)} ${parseInt(
                mColor.substr(3, 2),
                16
              )} ${parseInt(mColor.substr(5, 2), 16)} / ${d[0] + 40}%)`;
              // return layout.myColor.color;
              // return color;
            }
          }
        })
        .attr("opacity", `${layout.myproperties.barOpacity}`)
        .attr("class", "indBar")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);
      // .append("title")
      // .text((d) => d[1]);

      // console.log(svg);
      // mainChart.style("overflow-x", "scroll");
      if (layout.valueLabelSwitch) {
        svg
          .selectAll("text")
          .data(dataSet1)
          .enter()
          // Add your code below this line
          .append("text")
          .attr("x", (d, i) => xScale(d[1]) + xScale.bandwidth() / 2)
          .attr("y", (d, i) => yScale(d[0]) - 3)
          .text((d) => d[0])
          //.attr("transform","rotate(-45)")
          .style("font-size", "15px")
          .style("text-anchor", "middle")
          .attr("fill", "red");
      }
      let xAxis = () => {
        if (layout.myproperties.positionX == "top") {
          // console.log(layout.myproperties.positionX);
          return d3.axisTop(xScale);
        }
        if (layout.myproperties.positionX == "bottom") {
          return d3.axisBottom(xScale);
        }
        return d3.axisBottom(xScale);
      };
      let yAxis = () => {
        if (layout.myproperties.positionY == "right") {
          // console.log(layout.myproperties.positionY);
          return d3
            .axisRight(yScale)
            .ticks(
              layout.myproperties.scalingY == "wide"
                ? 3
                : layout.myproperties.scalingY == "medium"
                ? 8
                : layout.myproperties.scalingY == "narrow"
                ? 18
                : 8
            );
        }
        if (layout.myproperties.positionY == "left") {
          return d3
            .axisLeft(yScale)
            .ticks(
              layout.myproperties.scalingY == "wide"
                ? 3
                : layout.myproperties.scalingY == "medium"
                ? 8
                : layout.myproperties.scalingY == "narrow"
                ? 18
                : 8
            );
        }
        return d3.axisLeft(yScale);
      };
      let xAxisChart = d3
        .select(`#${layout.qInfo.qId}_chart_xAxis`)
        .append("svg")
        .attr("width", "100%")
        .attr(
          "height",
          `${$element[0].children[0].children[0].children[3].scrollHeight / 5}`
        );
      let xAxisScale = xAxisChart
        .append("g")
        .attr("transform", "translate(0,0)")
        .call(xAxis());
      xAxisScale.select("path").style("stroke", layout.xAxisColor.color);

      var wrap = function () {
        var self = d3.select(this),
          textLength = self.node().getComputedTextLength(),
          text = self.text();
        while (textLength > 50 && text.length > 0) {
          // console.log(textLength, text);
          text = text.slice(0, -1);
          self.text(text + "...");
          textLength = self.node().getComputedTextLength();
        }
      };

      xAxisScale
        .selectAll("text")
        // .attr(
        //   "transform",
        //   "translate(" +
        //     layout.myproperties.LorientationX[1] +
        //     ",0)rotate(" +
        //     layout.myproperties.LorientationX[0] +
        //     ")"
        // )
        // .attr("transform", "translate(0,0)rotate(0)")
        .attr("transform", () => {
          if (layout.myproperties.LorientationX == "tilted") {
            return "translate(-5,0)rotate(-45)";
          } else if (
            layout.myproperties.LorientationX == "horizontal" ||
            layout.myproperties.LorientationX == "auto"
          ) {
            return "translate(0,0)rotate(0)";
          }
          return "translate(0,0)rotate(0)";
        })
        .attr("text-anchor", () => {
          if (layout.myproperties.LorientationX == "tilted") {
            return "end";
          } else {
            return "middle";
          }
        })
        .each(wrap)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

      let xLabelChart = d3
        .select(`#${layout.qInfo.qId}_chart_xLabel`)
        .append("svg")
        .attr("width", "100%")
        .attr(
          "height",
          `${$element[0].children[0].children[0].children[4].scrollHeight / 5}`
        );
      xLabelChart
        .append("text")
        // .attr("y", () => {
        //   if (layout.myproperties.positionX == "top") {
        //     return -(padding / 1.4);
        //   }
        //   if (layout.myproperties.positionX == "bottom") {
        //     return padding / 2;
        //   }
        // })
        // .attr("dy", "1em")
        .attr(
          "x",
          $element[0].children[0].children[0].children[4].scrollWidth / 2
        )
        .attr(
          "y",
          $element[0].children[0].children[0].children[4].scrollHeight / 2
        )
        .attr("text-anchor", "middle")
        .attr("font-size", `${layout.myproperties.xAxisLabelSize}px`)
        // .attr("stroke", "green")
        .attr("fill", "black")
        .text(layout.qHyperCube.qDimensionInfo[0].qFallbackTitle)
        .style(
          "font-weight",
          layout.myproperties.x_y_AxisLabel === "bold" ||
            layout.myproperties.x_y_AxisLabel === "both"
            ? "980"
            : layout.myproperties.x_y_AxisLabel === "none"
            ? "none"
            : "none"
        )
        .style(
          "font-style",
          layout.myproperties.x_y_AxisLabel === "italic" ||
            layout.myproperties.x_y_AxisLabel === "both"
            ? "italic"
            : layout.myproperties.x_y_AxisLabel === "none"
            ? "none"
            : "none"
        );

      // g.append("g")
      //   .attr("transform", "translate(" + padding / 4 + ",0)")
      //   .attr("transform", "rotate(-90)")
      //   // .call(yAxis)
      //   .append("text")
      //   .attr("y", padding / 4)
      //   .attr("x", -h / 2)
      //   .attr("text-anchor", "end")
      //   .attr("stroke", "black")
      //   .text(layout.qHyperCube.qMeasureInfo[0].qFallbackTitle);

      let yAxisChart = d3
        .select(`#${layout.qInfo.qId}_chart_yAxis`)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%");
      let yAxisScale = yAxisChart

        .append("g")
        // .attr("transform", "translate(" + padding + ",0)")
        .attr(
          "transform",
          () => {
            if (layout.myproperties.positionY === "left") {
              return (
                "translate(" +
                ($element[0].children[0].children[0].children[1].scrollWidth -
                  2) +
                ",0)"
              );
            }
            if (layout.myproperties.positionY === "right") {
              // console.log(layout.myproperties.positionY);
              return "translate(" + (w - padding) + ",0)";
            }
          }
          // "translate(" +
          //   (w * layout.myproperties.positionY +
          //     padding * layout.myproperties.positionY) +
          //   ",0)"
        )
        .call(yAxis().tickFormat((d) => `${d3.format(".2s")(d)}`));
      yAxisScale.select("path").style("stroke", layout.yAxisColor.color);
      // console.log(d3.max(dataset1, (d) => d[0]));
      let yLabelChart = d3
        .select(`#${layout.qInfo.qId}_chart_yLabel`)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%");

      yLabelChart
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -h / 2)
        .attr("y", () => {
          if (layout.myproperties.positionY === "left") {
            return padding / 2;
          }
          if (layout.myproperties.positionY === "right") {
            // console.log(layout.myproperties.positionY);
            return padding * 1.7;
          }
        })
        .attr("dy", -padding)
        .attr("text-anchor", "middle")
        .attr("font-size", `${layout.myproperties.yAxisLabelSize}px`)
        .attr("fill", "black")
        // .attr("stroke", "black")
        .text(layout.qHyperCube.qMeasureInfo[0].qFallbackTitle)
        .style(
          "font-weight",
          layout.myproperties.x_y_AxisLabel === "bold" ||
            layout.myproperties.x_y_AxisLabel === "both"
            ? "980"
            : layout.myproperties.x_y_AxisLabel === "none"
            ? "none"
            : "none"
        )
        .style(
          "font-style",
          layout.myproperties.x_y_AxisLabel === "italic" ||
            layout.myproperties.x_y_AxisLabel === "both"
            ? "italic"
            : layout.myproperties.x_y_AxisLabel === "none"
            ? "none"
            : "none"
        );
      console.log("rrrrrr");

      //Grid
      if (layout.gridSwitch === true) {
        let xGrid = g
          .append("g")
          .attr("transform", () => {
            if (layout.myproperties.positionX == "top") {
              return "translate(0," + padding + ")";
            }
            if (layout.myproperties.positionX == "bottom") {
              return "translate(0," + (h - padding) + ")";
            }
          })
          .attr("opacity", `${layout.myproperties.gridOpacity}`)
          .style("stroke-dasharray", () => {
            if (layout.myproperties.gridLineFormate === "dashed") return "5 5";
            else if (layout.myproperties.gridLineFormate === "dotted")
              return "2 3.5";
            else return "0 0";
          })
          .call(
            xAxis().tickSize(-(h - padding * 2))
            // .ticks(
            //   // layout.myproperties.gridScaling == "wide"
            //   //   ? 3
            //   //   : layout.myproperties.gridScaling == "medium"
            //   //   ? 8
            //   //   : layout.myproperties.gridScaling == "narrow"
            //   //   ? 18
            //   //   : 8
            // )
          )
          .selectAll("text")
          .style("opacity", "0");
        xGrid.select("path").style("stroke", "white");

        let yGrid = g
          .append("g")
          // .attr("transform", "translate(" + padding + ",0)")
          .attr(
            "transform",
            () => {
              if (layout.myproperties.positionY === "left") {
                return "translate(" + padding + ",0)";
              }
              if (layout.myproperties.positionY === "right") {
                // console.log(layout.myproperties.positionY);
                return "translate(" + (w - padding) + ",0)";
              }
            }
            // "translate(" +
            //   (w * layout.myproperties.positionY +
            //     padding * layout.myproperties.positionY) +
            //   ",0)"
          )
          .attr("opacity", `${layout.myproperties.gridOpacity}`)
          .style("stroke-dasharray", () => {
            if (layout.myproperties.gridLineFormate === "dashed") return "5 5";
            else if (layout.myproperties.gridLineFormate === "dotted")
              return "2 3.5";
            else return "0 0";
          })
          .call(
            yAxis()
              .tickSize(-(w - padding * 2))
              .ticks(
                layout.myproperties.gridScaling == "wide"
                  ? 3
                  : layout.myproperties.gridScaling == "medium"
                  ? 8
                  : layout.myproperties.gridScaling == "narrow"
                  ? 18
                  : 8
              )
          )
          .selectAll("text")
          .style("opacity", "0");
        yGrid.select("path").style("stroke", "white");
      }

      //Legend
      // if (layout.legend.legendSwitch) {
      var legendContainer = d3
        .select("#" + layout.qInfo.qId + "_chart_legend")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("class", "legendCon");
      var legendGroup = legendContainer.append("g").attr("transform", () => {
        if (layout.legend.legendPos == "right")
          return "translate(" + (w - padding + 5) + "," + padding + ")";
        else if (layout.legend.legendPos == "left")
          return "translate(" + 5 + "," + padding + ")";
        else if (layout.legend.legendPos == "top")
          return "translate(" + w / 3 + "," + padding / 4 + ")";
        else if (layout.legend.legendPos == "bottom")
          return "translate(" + w / 3 + "," + (h - padding / 4) + ")";
      });
      //  + layout.myprops.position +
      let letterLen = 0;

      var legendG = legendGroup
        .selectAll(".legend")
        .data(dataSet1)
        .enter()
        .append("g")
        // .attr("transform", function (d, i) {
        //   return "translate(0," + i * 20 + ")";
        // })
        .attr("transform", function (d, i) {
          if (
            layout.legend.legendPos == "right" ||
            layout.legend.legendPos == "left"
          )
            return "translate(0," + i * 20 + ")";
          else if (
            layout.legend.legendPos == "top" ||
            layout.legend.legendPos == "bottom"
          )
            return "translate(" + (i * 100 + 10 * letterLen) + ",0)";
          letterLen = d[1].length;
        })
        .attr("class", "legend");

      legendG
        .append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", (d, i) => {
          return `${color(i)}`;
        });

      legendG
        .append("text")
        .text(function (d, i) {
          // console.log(d);
          return d[1];
        })
        .style("font-size", 12)
        .attr("y", 10)
        .attr("x", 11);
      // }

      //needed for export
      return qlik.Promise.resolve();
    },
  };
});
