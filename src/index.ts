import {
  Args_getAccountData,
  Args_getAccountGoals,
  Args_sampleMethod,
  SampleResult,
  Subgraph_Module,
} from "./wrap";
import { JSON } from "@polywrap/wasm-as";

export function sampleMethod(args: Args_sampleMethod): SampleResult {
  return {
    result: args.arg,
  };
}

export function getAccountData(args: Args_getAccountData): JSON.Value {
  // Query subgraph
  const query = `{\naccount(id: "${args.account.toLowerCase()}") {\nid\nachievedGoals\nfailedGoals\nmotivatedGoals\n}\n}`;
  const response = Subgraph_Module.querySubgraph({
    subgraphAuthor: args.subgraphAuthor,
    subgraphName: args.subgraphName,
    query: query,
  }).unwrap();
  const json = JSON.parse(response);
  // Check errors
  if (!json.isObj) {
    throw new Error(
      "Subgraph response is not an object.\n" +
        `Author: ${args.subgraphAuthor}\n` +
        `Subgraph: ${args.subgraphName}\n` +
        `Account: ${args.account}\n` +
        `Response: ${response}`
    );
  }
  // Return result
  const obj = json as JSON.Obj;
  return obj.valueOf().get("data") as JSON.Value;
}

export function getAccountGoals(args: Args_getAccountGoals): JSON.Value {
  // Query subgraph
  const query = `{\ngoals(where: {authorAddress: "${args.account.toLowerCase()}"}) {\nid\nuri\nisClosed\nisAchieved\n}\n}`;
  const response = Subgraph_Module.querySubgraph({
    subgraphAuthor: args.subgraphAuthor,
    subgraphName: args.subgraphName,
    query: query,
  }).unwrap();
  const json = JSON.parse(response);
  // Check errors
  if (!json.isObj) {
    throw new Error(
      "Subgraph response is not an object.\n" +
        `Author: ${args.subgraphAuthor}\n` +
        `Subgraph: ${args.subgraphName}\n` +
        `Account: ${args.account}\n` +
        `Response: ${response}`
    );
  }
  // Return result
  const obj = json as JSON.Obj;
  return obj.valueOf().get("data") as JSON.Value;
}
