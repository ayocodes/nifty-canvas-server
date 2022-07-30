import { CeramicClient } from "@ceramicnetwork/http-client";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import { randomBytes } from "crypto";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays";
import { aliases, API_URL } from "./constants.js";

export const getDocument = async ({
  did,
  family,
}: {
  did: string;
  family: string;
}) => {
  const ceramic = new CeramicClient(API_URL);

  const doc = await TileDocument.deterministic(ceramic, {
    // Did of the tile controller.
    controllers: [did],

    // Deployed model aliases definition.
    family,
  });

  return doc;
};

// Generates a random did.
export const generateDidKey = () => {
  return randomBytes(16).toString("hex");
};

// Authenticates a did.
export const generateCeramic = async (string: string) => {
  const hex = Buffer.from(string).toString("hex");

  const key = fromString(hex, "base16");

  // Create and authenticate the DID.
  const did = new DID({
    provider: new Ed25519Provider(key),
    resolver: getResolver(),
  });
  await did.authenticate();

  // Connect to the local Ceramic node.
  const ceramic = new CeramicClient(API_URL);
  ceramic.did = did;

  return ceramic;
};

export const generateDataStore = async (key: string) => {
  const ceramic = await generateCeramic(key);
  const model = new DataModel({ ceramic, aliases });
  return new DIDDataStore({ ceramic, model });
};
