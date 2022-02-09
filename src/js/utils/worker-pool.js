import workerpool from "workerpool";

module.exports = workerpool.pool(null, {minWorkers: "max"});