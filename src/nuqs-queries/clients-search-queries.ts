import { createLoader, parseAsString } from "nuqs";

export const clientsSearchParams = {
  clients: parseAsString.withDefault(""),
  status: parseAsString.withDefault(""),
}

export const loadClientsSearchParams = createLoader(clientsSearchParams);