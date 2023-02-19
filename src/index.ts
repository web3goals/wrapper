import { JSON } from "@polywrap/wasm-as";
import {
  Args_getAccountData,
  Args_getAccountGoals,
  Subgraph_Module,
} from "./wrap";

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
