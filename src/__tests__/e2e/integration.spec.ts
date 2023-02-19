import { PolywrapClient } from "@polywrap/client-js";
import path from "path";
import * as App from "../types/wrap";

jest.setTimeout(60000);

describe("Wrapper End to End Tests", () => {
  let wrapperUri: string;
  let client: PolywrapClient = new PolywrapClient();

  beforeAll(() => {
    const dirname: string = path.resolve(__dirname);
    const wrapperPath: string = path.join(dirname, "..", "..", "..");
    wrapperUri = `fs/${wrapperPath}/build`;
  });

  beforeEach(() => {
    client = new PolywrapClient();
  });

  it("calls sampleMethod", async () => {
    const expected: string = "polywrap";
    const result = await client.invoke<App.Template_SampleResult>({
      uri: wrapperUri,
      method: "sampleMethod",
      args: { arg: expected },
    });
    expect(result.ok).toBeTruthy();
    if (!result.ok) return;
    expect(result.value.result).toEqual(expected);
  });

  it("calls getAccountData", async () => {
    const result = await client.invoke({
      uri: wrapperUri,
      method: "getAccountData",
      args: {
        subgraphAuthor: "kiv1n",
        subgraphName: "web3-goals",
        account: "0x4306D7a79265D2cb85Db0c5a55ea5F4f6F73C4B1",
      },
    });
    expect(result.ok).toBeTruthy();
  });

  it("calls getAccountGoals", async () => {
    const result = await client.invoke({
      uri: wrapperUri,
      method: "getAccountGoals",
      args: {
        subgraphAuthor: "kiv1n",
        subgraphName: "web3-goals",
        account: "0x4306D7a79265D2cb85Db0c5a55ea5F4f6F73C4B1",
      },
    });
    console.log(result);
    expect(result.ok).toBeTruthy();
  });
});
