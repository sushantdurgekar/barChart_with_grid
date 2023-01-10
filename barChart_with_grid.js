define([
  "jquery",
  //mashup and extension interface
  "qlik",
  "https://d3js.org/d3.v7.min.js",
  "./properties",
  "css!./barChart_with_grid.css",
], function ($, qlik, d3, properties) {
  let colorS, prevColor;
  const app = qlik.currApp();
  let colorA = [];
  let selectVal = [];
  // console.log(properties);
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
    definition: properties,
    support: {
      snapshot: true,
      export: true,
      exportData: false,
    },
    paint: function ($element, layout) {
      let self = this;
      // console.log($element, layout);
      $element.html(
        `<div id="${layout.qInfo.qId}" style="height:100%">
          <div id="${layout.qInfo.qId}_chart" class="chartGrid" style='
          grid-template-columns: ${
            layout.legend.legendSwitch
              ? layout.legend.legendPos == "left"
                ? layout.myproperties.positionY == "left"
                  ? "2fr 0.7fr auto 9fr;"
                  : "2fr 9fr auto 0.7fr;"
                : layout.legend.legendPos == "right"
                ? layout.myproperties.positionY == "left"
                  ? "0.7fr auto 9fr 2fr;"
                  : "9fr auto 0.7fr 2fr;"
                : layout.legend.legendPos == "top"
                ? layout.myproperties.positionY == "left"
                  ? "0.7fr auto 9fr;"
                  : "9fr auto 0.7fr;"
                : layout.myproperties.positionY == "left"
                ? "0.7fr auto 9fr;"
                : "9fr auto 0.7fr;"
              : layout.myproperties.positionY == "left"
              ? "0.4fr auto 8fr;"
              : "8fr auto 0.4fr;"
          }
          
  grid-template-areas:
          
  ${
    layout.legend.legendSwitch
      ? layout.legend.legendPos == "top"
        ? layout.myproperties.positionY == "right"
          ? `"legend .... ...."`
          : `".... .... legend"`
        : ``
      : ``
  }

  ${
    layout.legend.legendSwitch
      ? layout.legend.legendPos == "right"
        ? layout.myproperties.positionY == "right"
          ? layout.myproperties.positionX == "top"
            ? `"xLabel1 .... .... ...."`
            : `"mainChart yAxis1 yLabel1 legend"`
          : layout.myproperties.positionX == "top"
          ? `".... .... xLabel1 ...."`
          : `"yLabel1 yAxis1 mainChart legend"`
        : layout.legend.legendPos == "left"
        ? layout.myproperties.positionY == "right"
          ? layout.myproperties.positionX == "top"
            ? `".... xLabel1 .... ...."`
            : `"legend mainChart yAxis1 yLabel1"`
          : layout.myproperties.positionX == "top"
          ? `".... .... .... xLabel1"`
          : `"legend yLabel1 yAxis1 mainChart"`
        : layout.legend.legendPos == "top"
        ? layout.myproperties.positionY == "right"
          ? layout.myproperties.positionX == "top"
            ? `"xLabel1 .... ...."`
            : `"mainChart yAxis1 yLabel1"`
          : layout.myproperties.positionX == "top"
          ? `".... .... xLabel1"`
          : `"yLabel1 yAxis1 mainChart"`
        : layout.myproperties.positionY == "right"
        ? layout.myproperties.positionX == "top"
          ? `"xLabel1 .... ...."`
          : `"mainChart yAxis1 yLabel1"`
        : layout.myproperties.positionX == "top"
        ? `".... .... xLabel1"`
        : `"yLabel1 yAxis1 mainChart"`
      : layout.myproperties.positionY == "right"
      ? layout.myproperties.positionX == "top"
        ? `"xLabel1 .... ...."`
        : `"mainChart yAxis1 yLabel1"`
      : layout.myproperties.positionX == "top"
      ? `".... .... xLabel1"`
      : `"yLabel1 yAxis1 mainChart"`
  }
  ${
    layout.legend.legendSwitch
      ? layout.legend.legendPos == "right"
        ? layout.myproperties.positionY == "right"
          ? `"xAxis1 .... .... ...."`
          : `".... .... xAxis1 ...."`
        : layout.legend.legendPos == "left"
        ? layout.myproperties.positionY == "right"
          ? `".... xAxis1 .... ...."`
          : `".... .... .... xAxis1"`
        : layout.legend.legendPos == "top"
        ? layout.myproperties.positionY == "right"
          ? `"xAxis1 .... ...."`
          : `".... .... xAxis1"`
        : layout.myproperties.positionY == "right"
        ? `"xAxis1 .... ...."`
        : `".... .... xAxis1"`
      : layout.myproperties.positionY == "right"
      ? `"xAxis1 .... ...."`
      : `".... .... xAxis1"`
  }
  ${
    layout.legend.legendSwitch
      ? layout.legend.legendPos == "right"
        ? layout.myproperties.positionY == "right"
          ? layout.myproperties.positionX == "top"
            ? `"mainChart yAxis1 yLabel1 legend"`
            : `"xLabel1 .... .... ...."`
          : layout.myproperties.positionX == "top"
          ? `"yLabel1 yAxis1 mainChart legend"`
          : `".... .... xLabel1 ...."`
        : layout.legend.legendPos == "left"
        ? layout.myproperties.positionY == "right"
          ? layout.myproperties.positionX == "top"
            ? `"legend mainChart yAxis1 yLabel1"`
            : `".... xLabel1 .... ...."`
          : layout.myproperties.positionX == "top"
          ? `"legend yLabel1 yAxis1 mainChart"`
          : `".... .... .... xLabel1"`
        : layout.legend.legendPos == "top"
        ? layout.myproperties.positionY == "right"
          ? layout.myproperties.positionX == "top"
            ? `"mainChart yAxis1 yLabel1"`
            : `"xLabel1 .... ...."`
          : layout.myproperties.positionX == "top"
          ? `"yLabel1 yAxis1 mainChart"`
          : `".... .... xLabel1"`
        : layout.myproperties.positionY == "right"
        ? layout.myproperties.positionX == "top"
          ? `"mainChart yAxis1 yLabel1"`
          : `"xLabel1 .... ...."`
        : layout.myproperties.positionX == "top"
        ? `"yLabel1 yAxis1 mainChart"`
        : `".... .... xLabel1"`
      : layout.myproperties.positionY == "right"
      ? layout.myproperties.positionX == "top"
        ? `"mainChart yAxis1 yLabel1"`
        : `"xLabel1 .... ...."`
      : layout.myproperties.positionX == "top"
      ? `"yLabel1 yAxis1 mainChart"`
      : `".... .... xLabel1"`
  }
  ${
    layout.legend.legendSwitch
      ? layout.legend.legendPos == "bottom"
        ? layout.myproperties.positionY == "right"
          ? `"legend .... ...."`
          : `".... .... legend"`
        : ``
      : ``
  };
  grid-template-rows:${
    layout.legend.legendSwitch
      ? layout.legend.legendPos == "top"
        ? layout.myproperties.positionX == "top"
          ? "0.7fr 0.7fr auto 8fr;"
          : "0.7fr 8fr auto 0.7fr;"
        : layout.legend.legendPos == "bottom"
        ? layout.myproperties.positionX == "top"
          ? "0.7fr auto 8fr 0.7fr;"
          : "8fr auto 0.7fr 0.7fr;"
        : layout.legend.legendPos == "left"
        ? layout.myproperties.positionX == "top"
          ? "0.7fr auto 8fr;"
          : "8fr auto 0.7fr;"
        : layout.myproperties.positionX == "top"
        ? "0.7fr auto 8fr;"
        : "8fr auto 0.7fr;"
      : layout.myproperties.positionX == "top"
      ? "0.7fr auto 8fr;"
      : "7fr auto 0.8fr;"
  }
          '>
            <div id="${
              layout.qInfo.qId
            }_chart_yLabel" style="grid-area:yLabel1; width:fit-content;">
            </div>
            <div id="${
              layout.qInfo.qId
            }_chart_yAxis" style="grid-area:yAxis1; width:fit-content;">
            </div>
            <div id="${
              layout.qInfo.qId
            }_chart_main" style="grid-area:mainChart">
            </div>
            <div id="${
              layout.qInfo.qId
            }_chart_xAxis" style="grid-area:xAxis1; height:fit-content;">
            </div>
            <div id="${
              layout.qInfo.qId
            }_chart_xLabel" style="grid-area:xLabel1; height:fit-content;">
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
        {
          dimension1: d[0].qText,
          elementNo1: d[0].qElemNumber,
        },
        { measure1: d[1].qNum },
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
      // console.log(
      //   $element[0].children[0].children[0].children,
      //   h,
      //   $element[0].children[0].children[0].children[2].offsetHeight
      // );
      let padding = w / 10;
      console.log(layout, $element);

      const svg = d3
        .select("#" + layout.qInfo.qId + "_chart_main")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
      // .call(
      //   d3.zoom().on("zoom", function (e) {
      //     svg.attr("transform", e.transform);
      //   })
      // );

      const xScale = d3
        .scaleBand()
        .domain(dataSet1.map((d) => d[0].dimension1))
        .range([0, w]);
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataSet1, (d) => d[1].measure1) * 1.5])
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
            ` ${layout.qHyperCube.qDimensionInfo[0].qFallbackTitle} : ${d[0].dimension1} <br>  ${layout.qHyperCube.qMeasureInfo[0].qFallbackTitle} : ${d[1].measure1}`
          );
        } else {
          tooltip.html(
            ` ${layout.qHyperCube.qDimensionInfo[0].qFallbackTitle} : ${d[0].dimension1} <br>  ${layout.qHyperCube.qMeasureInfo[0].qFallbackTitle} : ${d[1].measure1} <br> <div id="chartTooltip" style="height:50px;"></div> <br> <br> <div id="chartTooltip1" style="height:100px;"></div> <br>`
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
      function onClick(e, d) {
        // selectVal.push(d[1]);
        console.log(d[0], d[0].dimension1, d[0].elementNo1, this);
        // app
        //   .field(layout.qHyperCube.qDimensionInfo[0].qGroupFieldDefs[0])
        //   .selectValues([d[1]], true, true);
        // if (this.hasAttribute("data-value")) {
        if ($(this).hasClass("selected")) {
          $(this).removeClass("selected");
        } else {
          $(this).addClass("selected");
        }
        var value = parseInt(this.getAttribute("data-value"), 10);
        // if ($(this).hasClass("selected")) {
        //   $(this).appendClass("")
        // }
        self.selectValues(0, [value], true);
        // }
        // app
        //   .field(layout.qHyperCube.qDimensionInfo[0].qFallbackTitle)
        //   .selectValues([{ qText: `${d[1]}` }], true, true);
        // app
        //   .field(layout.qHyperCube.qDimensionInfo[0].qFallbackTitle)
        //   .selectValues(
        //     [{ qText: "Andersson" }, { qText: "Bush" }, { qText: "Obama" }],
        //     true,
        //     true
        //   );
      }

      console.log(xScale.bandwidth());
      svg
        .selectAll("rect")
        .data(dataSet1)
        .enter()
        .append("rect")
        .attr(
          "x",
          (d, i) =>
            xScale(d[0].dimension1) +
            xScale.bandwidth() /
              layout.qHyperCube.qDimensionInfo[0].qCardinalities.qCardinal
        )
        .attr("y", (d, i) => yScale(d[1].measure1))
        .attr("width", xScale.bandwidth() / 1.1)
        .attr("height", (d, i) => h - yScale(d[1].measure1))
        .attr("fill", (d, i) => {
          if (d[0].dimension1 === "-") {
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
              )} ${parseInt(mColor.substr(5, 2), 16)} / ${
                d[1].measure1 + 40
              }%)`;
              // return layout.myColor.color;
              // return color;
            }
          }
        })
        .attr("opacity", `${layout.myproperties.barOpacity}`)
        .attr("id", (d, i) => d[0].dimension1 + i)
        .attr("class", "indBar")
        .attr("data-value", (d) => d[0].elementNo1)
        // .on("mouseover", mouseover)
        // .on("mousemove", mousemove)
        // .on("mouseleave", mouseleave)
        .on("click", onClick);
      // .append("title")
      // .text((d) => d[0].dimension1);

      // console.log(svg);
      // mainChart.style("overflow-x", "scroll");
      if (layout.valueLabelSwitch) {
        svg
          .selectAll("text")
          .data(dataSet1)
          .enter()
          // Add your code below this line
          .append("text")
          .attr("x", (d, i) => xScale(d[0].dimension1) + xScale.bandwidth() / 2)
          .attr("y", (d, i) => yScale(d[1].measure1) - 3)
          .text((d) => d[1].measure1)
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
        .attr("width", "101%")
        .attr("height", "100%")
        .attr("class", "xAxisChart");
      let xAxisScale = xAxisChart
        .append("g")
        .attr("class", "xG_Axis")
        .call(xAxis());
      xAxisChart.attr(
        "height",
        d3.select(".xG_Axis").node().getBoundingClientRect().height
      );
      xAxisScale.select("path").style("stroke", layout.xAxisColor.color);

      //wraping text
      function wrap(e) {
        // console.log(e);
        var self = d3.select(this),
          textLength = self.node().getComputedTextLength(),
          text = self.text();
        while (textLength > xScale.bandwidth() / 1.2 && text.length > 0) {
          // console.log(textLength, text);
          text = text.slice(0, -1);
          self.text(text + "...");
          textLength = self.node().getComputedTextLength();
        }
      }

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
      d3.select(".xAxisChart").attr(
        "height",
        d3.select(".xG_Axis").node().getBoundingClientRect().height
      );
      d3.select(".xG_Axis").attr("transform", () => {
        if (layout.myproperties.positionX == "top") {
          return `translate(0,${
            d3.select(".xG_Axis").node().getBoundingClientRect().height - 2
          })`;
        }
        return "translate(0,0)";
      });
      let xLabelChart = d3
        .select(`#${layout.qInfo.qId}_chart_xLabel`)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("class", "xLabelChart");
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
      d3.select(".xLabelChart").attr(
        "height",
        `${xLabelChart.select("text").node().getBoundingClientRect().height}`
      );
      xLabelChart
        .select("text")
        .attr(
          "y",
          `${
            xLabelChart.select("text").node().getBoundingClientRect().height /
            1.2
          }`
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
        .attr("height", "100%")
        .attr("class", "yAxisChart");
      console.log(
        $element,
        $element[0].children[0].children[0].children[1].scrollWidth
      );

      let yAxisScale = yAxisChart

        .append("g")
        .attr("class", "yG_Axis")
        // .attr("transform", "translate(" + padding + ",0)")

        .call(yAxis().tickFormat((d) => `${d3.format(".2s")(d)}`));
      yAxisScale.select("path").style("stroke", layout.yAxisColor.color);
      d3.select(".yAxisChart").attr(
        "width",
        d3.select(".yG_Axis").node().getBoundingClientRect().width
      );
      yAxisChart.select("g").attr(
        "transform",
        () => {
          if (layout.myproperties.positionY === "left") {
            return (
              "translate(" +
              (d3.select(".yG_Axis").node().getBoundingClientRect().width - 1) +
              ",0)"
            );
          }
          if (layout.myproperties.positionY === "right") {
            // console.log(layout.myproperties.positionY);
            return "translate(0,0)";
          }
        }
        // "translate(" +
        //   (w * layout.myproperties.positionY +
        //     padding * layout.myproperties.positionY) +
        //   ",0)"
      );
      let yLabelChart = d3
        .select(`#${layout.qInfo.qId}_chart_yLabel`)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("class", "yLabelChart");

      yLabelChart
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -h / 2)
        .attr(
          "y",
          $element[0].children[0].children[0].children[0].scrollWidth * 2
        )
        // .attr("dy", -padding)
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
      d3.select(".yLabelChart").attr(
        "width",
        `${yLabelChart.select("text").node().getBoundingClientRect().width}`
      );
      yLabelChart
        .select("text")
        .attr(
          "y",
          `${
            yLabelChart.select("text").node().getBoundingClientRect().width / 2
          }`
        );
      //Grid
      // if (layout.gridSwitch === true) {
      //   let xGrid = g
      //     .append("g")
      //     .attr("transform", () => {
      //       if (layout.myproperties.positionX == "top") {
      //         return "translate(0," + padding + ")";
      //       }
      //       if (layout.myproperties.positionX == "bottom") {
      //         return "translate(0," + (h - padding) + ")";
      //       }
      //     })
      //     .attr("opacity", `${layout.myproperties.gridOpacity}`)
      //     .style("stroke-dasharray", () => {
      //       if (layout.myproperties.gridLineFormate === "dashed") return "5 5";
      //       else if (layout.myproperties.gridLineFormate === "dotted")
      //         return "2 3.5";
      //       else return "0 0";
      //     })
      //     .call(
      //       xAxis().tickSize(-(h - padding * 2))
      //       // .ticks(
      //       //   // layout.myproperties.gridScaling == "wide"
      //       //   //   ? 3
      //       //   //   : layout.myproperties.gridScaling == "medium"
      //       //   //   ? 8
      //       //   //   : layout.myproperties.gridScaling == "narrow"
      //       //   //   ? 18
      //       //   //   : 8
      //       // )
      //     )
      //     .selectAll("text")
      //     .style("opacity", "0");
      //   xGrid.select("path").style("stroke", "white");

      //   let yGrid = g
      //     .append("g")
      //     // .attr("transform", "translate(" + padding + ",0)")
      //     .attr(
      //       "transform",
      //       () => {
      //         if (layout.myproperties.positionY === "left") {
      //           return "translate(" + padding + ",0)";
      //         }
      //         if (layout.myproperties.positionY === "right") {
      //           // console.log(layout.myproperties.positionY);
      //           return "translate(" + (w - padding) + ",0)";
      //         }
      //       }
      //       // "translate(" +
      //       //   (w * layout.myproperties.positionY +
      //       //     padding * layout.myproperties.positionY) +
      //       //   ",0)"
      //     )
      //     .attr("opacity", `${layout.myproperties.gridOpacity}`)
      //     .style("stroke-dasharray", () => {
      //       if (layout.myproperties.gridLineFormate === "dashed") return "5 5";
      //       else if (layout.myproperties.gridLineFormate === "dotted")
      //         return "2 3.5";
      //       else return "0 0";
      //     })
      //     .call(
      //       yAxis()
      //         .tickSize(-(w - padding * 2))
      //         .ticks(
      //           layout.myproperties.gridScaling == "wide"
      //             ? 3
      //             : layout.myproperties.gridScaling == "medium"
      //             ? 8
      //             : layout.myproperties.gridScaling == "narrow"
      //             ? 18
      //             : 8
      //         )
      //     )
      //     .selectAll("text")
      //     .style("opacity", "0");
      //   yGrid.select("path").style("stroke", "white");
      // }
      // console.log(yLabelChart.select("svg").node().getBoundingClientRect());
      console.log("rrrrrr");
      console.log(
        d3.select(".xG_Axis").node().getBoundingClientRect().height,
        d3.select(".yG_Axis").node().getBoundingClientRect().width,
        yLabelChart.select("text").node().getBoundingClientRect().width
      );
      //Legend
      if (layout.legend.legendSwitch) {
        var legendContainer = d3
          .select("#" + layout.qInfo.qId + "_chart_legend")
          .append("svg")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("class", "legendCon");
        var legendGroup = legendContainer.append("g").attr(
          "transform",
          "translate(10,10)"
          //   () => {
          //   if (layout.legend.legendPos == "right")
          //     return "translate(" + (w - padding + 5) + "," + padding + ")";
          //   else if (layout.legend.legendPos == "left")
          //     return "translate(" + 5 + "," + padding + ")";
          //   else if (layout.legend.legendPos == "top")
          //     return "translate(" + w / 3 + "," + padding / 4 + ")";
          //   else if (layout.legend.legendPos == "bottom")
          //     return "translate(" + w / 3 + "," + (h - padding / 4) + ")";
          // }
        );
        //  + layout.myprops.position +
        let letterLen = 0;
        let letterPreLen = 0;
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
              letterLen = 5 * letterLen + letterPreLen;
            console.log(
              d[0].dimension1.length,
              d[0].dimension1.length * 6,
              letterLen
            );
            let transformLS = "translate(" + letterLen + ",0)";
            letterPreLen = letterLen + 30;
            letterLen = d[0].dimension1.length;
            return transformLS;
          })
          .attr("class", "legend");

        legendG
          .append("rect")
          .attr("width", 12)
          .attr("height", 12)
          .attr("fill", (d, i) => {
            return `${color(i)}`;
          });

        legendG
          .append("text")
          .attr("class", (d, i) => {
            return "legentText" + i;
          })
          .text(function (d, i) {
            // console.log(d);
            return d[0].dimension1;
          })
          .style("font-size", 12)
          .attr("y", 10)
          .attr("x", 14);
        if (
          layout.legend.legendPos == "top" ||
          layout.legend.legendPos == "bottom"
        ) {
          d3.select(".legendCon").attr(
            "height",
            d3.select(".legend").node().getBoundingClientRect().height * 2
          );
        }
      }
      // console.log(
      //   d3.select(".xG_Axis").node().getBoundingClientRect().height,
      //   d3.select(".yG_Axis").node().getBoundingClientRect().width,
      //   d3.select(".legend").node().getBoundingClientRect().height
      // );
      //needed for export
      return qlik.Promise.resolve();
    },
  };
});
