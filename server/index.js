const express = require("express");
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// fetch data from source
let DisableAll = false;
let data = [];
fetch(
  "https://dataguard.blob.core.windows.net/challenges/plugins/fe-challenge.json"
)
  .then((res) => res.json())
  .then((res) => {
    data = res.data;
  });

// routes
app.post("/status", function (req, res) {
  DisableAll = req.body.status;
  res.json({
    success: true,
  });
});

app.get("/init", function (req, res) {
  let result = [];

  for (const el in data.tabdata) {
    result.push({
      ...data.tabdata[el],
      route: el,
    });
  }

  res.json({
    success: true,
    result: result,
    DisableAll,
  });
});

app.get("/plugins/:tab", function (req, res) {
  let result = [];
  const TabData = data.tabdata[req.params.tab];

  for (const item of TabData.active) {
    result.push({
      ...data.plugins[item],
      value: true,
      active: true,
      disabled: false,
      inactive: false,
      route: item,
    });
  }
  for (const item of TabData.disabled) {
    result.push({
      ...data.plugins[item],
      value: false,
      active: false,
      disabled: true,
      inactive: false,
      route: item,
    });
  }
  for (const item of TabData.inactive) {
    result.push({
      ...data.plugins[item],
      value: false,
      active: false,
      disabled: false,
      inactive: true,
      route: item,
    });
  }

  result.sort(function (a, b) {
    var nameA = a.title.toUpperCase(); // ignore upper and lowercase
    var nameB = b.title.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  res.json({
    success: true,
    result: result,
  });
});

app.post("/plugin/status/:tab", function (req, res) {
  const TabData = data.tabdata[req.params.tab];
  const isActive = TabData.active.includes(req.body.plugin);
  const isInActive = TabData.inactive.includes(req.body.plugin);
  const isDisabled = TabData.disabled.includes(req.body.plugin);
  if (isActive) {
    data.tabdata[req.params.tab].active = data.tabdata[
      req.params.tab
    ].active.filter((el) => el !== req.body.plugin);
    data.tabdata[req.params.tab].inactive.push(req.body.plugin);
  } else if (isInActive) {
    data.tabdata[req.params.tab].inactive = data.tabdata[
      req.params.tab
    ].inactive.filter((el) => el !== req.body.plugin);
    data.tabdata[req.params.tab].active.push(req.body.plugin);
  }
  res.json({
    success: true,
  });
});

export default {
  path: "/api",
  handler: app,
};
