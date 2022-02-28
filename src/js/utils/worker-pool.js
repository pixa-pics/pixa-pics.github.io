import workerpool from "workerpool";
export default workerpool.pool(null, {minWorkers: "max"});