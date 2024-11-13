import type { BetterAuthClientPlugin, BetterAuthPlugin } from "better-auth";
import { createAuthEndpoint } from "better-auth/plugins";
import { CreateCompanySchema } from "../db";

export const organizationPlugin = () => {
    return {
        id: "organizationPlugin",
        schema: {
            organization: {
                tableName: "organization",
                fields: {
                    id: {
                        defaultValue: "",
                        type: "string",
                        transform: (value) => {
                            return value;
                        },
                    },
                    name: {
                        type: "string",
                        required: true,
                    },
                    coverImage: {
                        type: "string",
                        defaultValue: "",
                    },
                    description: {
                        type: "string",
                        defaultValue: "",
                    },
                    onBoardingComplete: {
                        type: "boolean",
                        defaultValue: false,
                        required: true,
                    },
                    addressId: {
                        type: "string",
                        references: {
                            field: "id",
                            model: "company_address",
                            onDelete: "cascade",
                        },
                    },
                    openAt: {
                        type: "string",
                    },
                    closeAt: {
                        type: "string",
                    },
                    stripeId: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                        required: true,
                        unique: true,
                    },
                    atHome: {
                        type: "boolean",
                        required: true,
                    },
                    plan: {
                        type: "string",
                        required: true,
                    },
                    progressionId: {
                        type: "string",
                    },
                    nac: {
                        type: "string",
                    },
                    locked: {
                        type: "boolean",
                        defaultValue: false,
                        required: true,
                    },
                    lang: {
                        type: "string",
                        defaultValue: "fr",
                    },
                    createdAt: {
                        type: "string",
                        required: true,
                    },
                    updatedAt: {
                        type: "string",
                        required: true,
                    },
                },
            },
        },
        endpoints: {
            listOrganizations: createAuthEndpoint("/api/auth/organization/list-organizations", {
                method: "GET",
                body: CreateCompanySchema,
            }, async ({ context }) => {
                
            }),
            getMyOrganization: createAuthEndpoint("/api/auth/organization/get-my-organization", {
                method: "GET",
            }, async (ctx) => {
                
            }),
            createOrganization: createAuthEndpoint("/api/auth/organization/create-organization", {
                method: "POST",
            }, async (ctx) => {

            }),
            updateOrganization: createAuthEndpoint("/api/auth/organization/update-organization", {
                method: "PATCH",
            }, async (ctx) => {

            }),
        },
    } satisfies BetterAuthPlugin;
};

export const organizationPluginClient = () => {
    return {
        id: "organizationPluginClient",
        $InferServerPlugin: {} as ReturnType<typeof organizationPlugin>,
        getActions: ($fetch) => {
            return {
                listOrganizations: () => {
                    return $fetch("/api/auth/organization/list-organizations");
                },
                getMyOrganization: () => {
                    return $fetch("/api/auth/organization/get-my-organization");
                },
                createOrganization: (data: any) => {
                    return $fetch("/api/auth/organization/create-organization", {
                        method: "POST",
                        body: data,
                    });
                },
                updateOrganization: (data: any) => {
                    return $fetch("/api/auth/organization/update-organization", {
                        method: "PATCH",
                        body: data,
                    });
                }
            }
        },
        getAtoms: ($fetch) => {
            return {}
        }
    } satisfies BetterAuthClientPlugin;
}