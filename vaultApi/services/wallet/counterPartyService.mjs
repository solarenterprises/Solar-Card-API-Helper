// services/wallet/counterPartyService.mjs
import ky from 'ky';
import config from '../../config/config.mjs';

// Initialize ky instance
const kyInstance = ky.create({
    prefixUrl: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        partnerId: config.PARTNER_ID,
    },
});

const counterPartyService = {
    getCounterPartyById: async (token, uuid) => {

        try {
            const response = await kyInstance.get(`wallet/counterparty/${uuid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error)
            throw new Error("Get counterparty by ID");
        }
    },

    /////////////////////////////////////////////////////////////////////////////////////
    createNewCounterPartyForCrypto: async (token, data) => {
        try {
            const payload = {
                type: data.type,
                rail: "CRYPTO",
                blockchain: data.blockchain,
                blockchainAddress: data.blockchainAddress,
                walletType: "INSTITUTION",
                profile: {
                    profileType: data.profile.profileType,
                    name: data.profile.name,
                    relationshipToCustomer: data.profile.relationshipToCustomer,
                    ...(data.profile.email && { email: data.profile.email }),
                    ...(data.profile.telephoneNumber && { telephoneNumber: data.profile.telephoneNumber }),
                    ...(data.profile.taxReferenceNumber && { taxReferenceNumber: data.profile.taxReferenceNumber }),
                    ...(data.profile.lineOfBusiness && { lineOfBusiness: data.profile.lineOfBusiness }),
                    ...(data.profile.address && {
                        address: {
                            ...(data.profile.address.country && { country: data.profile.address.country }),
                            ...(data.profile.address.postCode && { postCode: data.profile.address.postCode }),
                            ...(data.profile.address.state && { state: data.profile.address.state }),
                            ...(data.profile.address.town && { town: data.profile.address.town }),
                            ...(data.profile.address.street && { street: data.profile.address.street }),
                            ...(data.profile.address.subStreet && { subStreet: data.profile.address.subStreet }),
                            ...(data.profile.address.buildingName && { buildingName: data.profile.address.buildingName }),
                            ...(data.profile.address.flatNumber && { flatNumber: data.profile.address.flatNumber }),
                            ...(data.profile.address.buildingNumber && { buildingNumber: data.profile.address.buildingNumber }),
                        }
                    })
                },
                ...(data.id && { id: data.id }),
                ...(data.currency && { currency: data.currency }),
                ...(data.institutionName && { institutionName: data.institutionName }),
                ...(data.institutionAddress && {
                    institutionAddress: {
                        ...(data.institutionAddress.country && { country: data.institutionAddress.country }),
                        ...(data.institutionAddress.postCode && { postCode: data.institutionAddress.postCode }),
                        ...(data.institutionAddress.state && { state: data.institutionAddress.state }),
                        ...(data.institutionAddress.town && { town: data.institutionAddress.town }),
                        ...(data.institutionAddress.street && { street: data.institutionAddress.street }),
                        ...(data.institutionAddress.subStreet && { subStreet: data.institutionAddress.subStreet }),
                        ...(data.institutionAddress.buildingName && { buildingName: data.institutionAddress.buildingName }),
                        ...(data.institutionAddress.flatNumber && { flatNumber: data.institutionAddress.flatNumber }),
                        ...(data.institutionAddress.buildingNumber && { buildingNumber: data.institutionAddress.buildingNumber }),
                    }
                }),
                ...(data.description && {
                    description: data.description,
                })
            };


            const response = await kyInstance.post(`wallet/counterparty`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    json: payload
                }
            );
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error)
            throw new Error("Create a counterparty for Crypto");
        }
    },

    createNewCounterPartyForACH: async (token, data) => {
        try {
            const payload = {
                type: data.type,
                rail: "ACH",
                accountNumber: data.accountNumber,
                walletType: "INSTITUTION",
                profile: {
                    profileType: data.profile.profileType,
                    name: data.profile.name,
                    relationshipToCustomer: data.profile.relationshipToCustomer,
                    ...(data.profile.email && { email: data.profile.email }),
                    ...(data.profile.telephoneNumber && { telephoneNumber: data.profile.telephoneNumber }),
                    ...(data.profile.taxReferenceNumber && { taxReferenceNumber: data.profile.taxReferenceNumber }),
                    ...(data.profile.lineOfBusiness && { lineOfBusiness: data.profile.lineOfBusiness }),
                    ...(data.profile.address && {
                        address: {
                            ...(data.profile.address.country && { country: data.profile.address.country }),
                            ...(data.profile.address.postCode && { postCode: data.profile.address.postCode }),
                            ...(data.profile.address.state && { state: data.profile.address.state }),
                            ...(data.profile.address.town && { town: data.profile.address.town }),
                            ...(data.profile.address.street && { street: data.profile.address.street }),
                            ...(data.profile.address.subStreet && { subStreet: data.profile.address.subStreet }),
                            ...(data.profile.address.buildingName && { buildingName: data.profile.address.buildingName }),
                            ...(data.profile.address.flatNumber && { flatNumber: data.profile.address.flatNumber }),
                            ...(data.profile.address.buildingNumber && { buildingNumber: data.profile.address.buildingNumber }),
                        }
                    })
                },
                ...(data.id && { id: data.id }),
                ...(data.currency && { currency: data.currency }),
                ...(data.institutionName && { institutionName: data.institutionName }),
                ...(data.institutionAddress && {
                    institutionAddress: {
                        ...(data.institutionAddress.country && { country: data.institutionAddress.country }),
                        ...(data.institutionAddress.postCode && { postCode: data.institutionAddress.postCode }),
                        ...(data.institutionAddress.state && { state: data.institutionAddress.state }),
                        ...(data.institutionAddress.town && { town: data.institutionAddress.town }),
                        ...(data.institutionAddress.street && { street: data.institutionAddress.street }),
                        ...(data.institutionAddress.subStreet && { subStreet: data.institutionAddress.subStreet }),
                        ...(data.institutionAddress.buildingName && { buildingName: data.institutionAddress.buildingName }),
                        ...(data.institutionAddress.flatNumber && { flatNumber: data.institutionAddress.flatNumber }),
                        ...(data.institutionAddress.buildingNumber && { buildingNumber: data.institutionAddress.buildingNumber }),
                    }
                }),
                ...(data.description && {
                    description: data.description,
                }),
                ...(data.routingNumber && {
                    routingNumber: data.routingNumber,
                })
            };


            const response = await kyInstance.post(`wallet/counterparty`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    json: payload
                }
            );
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error)
            throw new Error("Create a counterparty for ACH");
        }
    },

    createNewCounterPartyForFedwire: async (token, data) => {
        try {
            const payload = {
                type: data.type,
                rail: "FEDWIRE",
                routingNumber: data.routingNumber,
                accountNumber: data.accountNumber,
                walletType: "INSTITUTION",
                profile: {
                    profileType: data.profile.profileType,
                    name: data.profile.name,
                    relationshipToCustomer: data.profile.relationshipToCustomer,
                    ...(data.profile.email && { email: data.profile.email }),
                    ...(data.profile.telephoneNumber && { telephoneNumber: data.profile.telephoneNumber }),
                    ...(data.profile.taxReferenceNumber && { taxReferenceNumber: data.profile.taxReferenceNumber }),
                    ...(data.profile.lineOfBusiness && { lineOfBusiness: data.profile.lineOfBusiness }),
                    ...(data.profile.address && {
                        address: {
                            ...(data.profile.address.country && { country: data.profile.address.country }),
                            ...(data.profile.address.postCode && { postCode: data.profile.address.postCode }),
                            ...(data.profile.address.state && { state: data.profile.address.state }),
                            ...(data.profile.address.town && { town: data.profile.address.town }),
                            ...(data.profile.address.street && { street: data.profile.address.street }),
                            ...(data.profile.address.subStreet && { subStreet: data.profile.address.subStreet }),
                            ...(data.profile.address.buildingName && { buildingName: data.profile.address.buildingName }),
                            ...(data.profile.address.flatNumber && { flatNumber: data.profile.address.flatNumber }),
                            ...(data.profile.address.buildingNumber && { buildingNumber: data.profile.address.buildingNumber }),
                        }
                    })
                },
                ...(data.id && { id: data.id }),
                ...(data.currency && { currency: data.currency }),
                ...(data.institutionName && { institutionName: data.institutionName }),
                ...(data.institutionAddress && {
                    institutionAddress: {
                        ...(data.institutionAddress.country && { country: data.institutionAddress.country }),
                        ...(data.institutionAddress.postCode && { postCode: data.institutionAddress.postCode }),
                        ...(data.institutionAddress.state && { state: data.institutionAddress.state }),
                        ...(data.institutionAddress.town && { town: data.institutionAddress.town }),
                        ...(data.institutionAddress.street && { street: data.institutionAddress.street }),
                        ...(data.institutionAddress.subStreet && { subStreet: data.institutionAddress.subStreet }),
                        ...(data.institutionAddress.buildingName && { buildingName: data.institutionAddress.buildingName }),
                        ...(data.institutionAddress.flatNumber && { flatNumber: data.institutionAddress.flatNumber }),
                        ...(data.institutionAddress.buildingNumber && { buildingNumber: data.institutionAddress.buildingNumber }),
                    }
                }),
                ...(data.description && {
                    description: data.description,
                }),
            };


            const response = await kyInstance.post(`wallet/counterparty`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    json: payload
                }
            );
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error)
            throw new Error("Create a counterparty for FEDWIRE");
        }
    },

    createNewCounterPartyForSwift: async (token, data) => {
        try {
            const payload = {
                type: data.type,
                rail: "SWIFT",
                accountNumber: data.accountNumber,
                walletType: "INSTITUTION",
                profile: {
                    profileType: data.profile.profileType,
                    name: data.profile.name,
                    relationshipToCustomer: data.profile.relationshipToCustomer,
                    ...(data.profile.email && { email: data.profile.email }),
                    ...(data.profile.telephoneNumber && { telephoneNumber: data.profile.telephoneNumber }),
                    ...(data.profile.taxReferenceNumber && { taxReferenceNumber: data.profile.taxReferenceNumber }),
                    ...(data.profile.lineOfBusiness && { lineOfBusiness: data.profile.lineOfBusiness }),
                    ...(data.profile.address && {
                        address: {
                            ...(data.profile.address.country && { country: data.profile.address.country }),
                            ...(data.profile.address.postCode && { postCode: data.profile.address.postCode }),
                            ...(data.profile.address.state && { state: data.profile.address.state }),
                            ...(data.profile.address.town && { town: data.profile.address.town }),
                            ...(data.profile.address.street && { street: data.profile.address.street }),
                            ...(data.profile.address.subStreet && { subStreet: data.profile.address.subStreet }),
                            ...(data.profile.address.buildingName && { buildingName: data.profile.address.buildingName }),
                            ...(data.profile.address.flatNumber && { flatNumber: data.profile.address.flatNumber }),
                            ...(data.profile.address.buildingNumber && { buildingNumber: data.profile.address.buildingNumber }),
                        }
                    })
                },
                ...(data.id && { id: data.id }),
                ...(data.currency && { currency: data.currency }),
                ...(data.institutionName && { institutionName: data.institutionName }),
                ...(data.institutionAddress && {
                    institutionAddress: {
                        ...(data.institutionAddress.country && { country: data.institutionAddress.country }),
                        ...(data.institutionAddress.postCode && { postCode: data.institutionAddress.postCode }),
                        ...(data.institutionAddress.state && { state: data.institutionAddress.state }),
                        ...(data.institutionAddress.town && { town: data.institutionAddress.town }),
                        ...(data.institutionAddress.street && { street: data.institutionAddress.street }),
                        ...(data.institutionAddress.subStreet && { subStreet: data.institutionAddress.subStreet }),
                        ...(data.institutionAddress.buildingName && { buildingName: data.institutionAddress.buildingName }),
                        ...(data.institutionAddress.flatNumber && { flatNumber: data.institutionAddress.flatNumber }),
                        ...(data.institutionAddress.buildingNumber && { buildingNumber: data.institutionAddress.buildingNumber }),
                    }
                }),
                ...(data.description && {
                    description: data.description,
                }),
                ...(data.swiftBic && {
                    swiftBic: data.swiftBic,
                }),
                
                ...(data.intermediary && {
                    intermediary: {
                        currency: data.intermediary.currency,
                        institutionName: data.intermediary.institutionName,
                        ...(data.intermediary.institutionAddress && {
                            institutionAddress: {
                                ...(data.intermediary.institutionAddress.country && { country: data.intermediary.institutionAddress.country }),
                                ...(data.intermediary.institutionAddress.postCode && { postCode: data.intermediary.institutionAddress.postCode }),
                                ...(data.intermediary.institutionAddress.state && { state: data.intermediary.institutionAddress.state }),
                                ...(data.intermediary.institutionAddress.town && { town: data.intermediary.institutionAddress.town }),
                                ...(data.intermediary.institutionAddress.street && { street: data.intermediary.institutionAddress.street }),
                                ...(data.intermediary.institutionAddress.subStreet && { subStreet: data.intermediary.institutionAddress.subStreet }),
                                ...(data.intermediary.institutionAddress.buildingName && { buildingName: data.intermediary.institutionAddress.buildingName }),
                                ...(data.intermediary.institutionAddress.flatNumber && { flatNumber: data.intermediary.institutionAddress.flatNumber }),
                                ...(data.intermediary.institutionAddress.buildingNumber && { buildingNumber: data.intermediary.institutionAddress.buildingNumber }),
                            }
                        }),
                        ...(data.intermediary.swiftBic && {
                            swiftBic: data.intermediary.swiftBic
                        }),
                        ...(data.intermediary.routingNumber && {
                            routingNumber: data.intermediary.routingNumber
                        })

                    }
                }),

            };


            const response = await kyInstance.post(`wallet/counterparty`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    json: payload
                }
            );
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error)
            throw new Error("Create a counterparty for SWIFT");
        }
    },

    createNewCounterPartyForSepa: async (token, data) => {
        try {
            const payload = {
                type: data.type,
                rail: "SEPA",
                walletType: "INSTITUTION",
                ...(data.id && { id: data.id }),
                ...(data.currency && { currency: data.currency }),
                ...(data.description && {
                    description: data.description,
                }),
                ...(data.institutionAddress && {
                    institutionAddress: {
                        ...(data.institutionAddress.country && { country: data.institutionAddress.country }),
                        ...(data.institutionAddress.postCode && { postCode: data.institutionAddress.postCode }),
                        ...(data.institutionAddress.state && { state: data.institutionAddress.state }),
                        ...(data.institutionAddress.town && { town: data.institutionAddress.town }),
                        ...(data.institutionAddress.street && { street: data.institutionAddress.street }),
                        ...(data.institutionAddress.subStreet && { subStreet: data.institutionAddress.subStreet }),
                        ...(data.institutionAddress.buildingName && { buildingName: data.institutionAddress.buildingName }),
                        ...(data.institutionAddress.flatNumber && { flatNumber: data.institutionAddress.flatNumber }),
                        ...(data.institutionAddress.buildingNumber && { buildingNumber: data.institutionAddress.buildingNumber }),
                    }
                }),
                profile: {
                    profileType: data.profile.profileType,
                    name: data.profile.name,
                    relationshipToCustomer: data.profile.relationshipToCustomer,
                    ...(data.profile.email && { email: data.profile.email }),
                    ...(data.profile.telephoneNumber && { telephoneNumber: data.profile.telephoneNumber }),
                    ...(data.profile.taxReferenceNumber && { taxReferenceNumber: data.profile.taxReferenceNumber }),
                    ...(data.profile.lineOfBusiness && { lineOfBusiness: data.profile.lineOfBusiness }),
                    ...(data.profile.address && {
                        address: {
                            ...(data.profile.address.country && { country: data.profile.address.country }),
                            ...(data.profile.address.postCode && { postCode: data.profile.address.postCode }),
                            ...(data.profile.address.state && { state: data.profile.address.state }),
                            ...(data.profile.address.town && { town: data.profile.address.town }),
                            ...(data.profile.address.street && { street: data.profile.address.street }),
                            ...(data.profile.address.subStreet && { subStreet: data.profile.address.subStreet }),
                            ...(data.profile.address.buildingName && { buildingName: data.profile.address.buildingName }),
                            ...(data.profile.address.flatNumber && { flatNumber: data.profile.address.flatNumber }),
                            ...(data.profile.address.buildingNumber && { buildingNumber: data.profile.address.buildingNumber }),
                        }
                    })
                },
                ...(data.iban && { iban: data.iban }),
                ...(data.swiftBic && {
                    swiftBic: data.swiftBic,
                }),
            };


            const response = await kyInstance.post(`wallet/counterparty`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    json: payload
                }
            );
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error)
            throw new Error("Create a counterparty for SEPA");
        }
    },

    //////////////////////////////////////////////////////////////////////////////////
    
    updateCounterPartyForCrypto: async (token, counterPartyUuid, data) => {
        try {
            const payload = {
                type: data.type,
                rail: "CRYPTO",
                blockchain: data.blockchain,
                blockchainAddress: data.blockchainAddress,
                walletType: "INSTITUTION",
                profile: {
                    profileType: data.profile.profileType,
                    name: data.profile.name,
                    relationshipToCustomer: data.profile.relationshipToCustomer,
                    ...(data.profile.email && { email: data.profile.email }),
                    ...(data.profile.telephoneNumber && { telephoneNumber: data.profile.telephoneNumber }),
                    ...(data.profile.taxReferenceNumber && { taxReferenceNumber: data.profile.taxReferenceNumber }),
                    ...(data.profile.lineOfBusiness && { lineOfBusiness: data.profile.lineOfBusiness }),
                    ...(data.profile.address && {
                        address: {
                            ...(data.profile.address.country && { country: data.profile.address.country }),
                            ...(data.profile.address.postCode && { postCode: data.profile.address.postCode }),
                            ...(data.profile.address.state && { state: data.profile.address.state }),
                            ...(data.profile.address.town && { town: data.profile.address.town }),
                            ...(data.profile.address.street && { street: data.profile.address.street }),
                            ...(data.profile.address.subStreet && { subStreet: data.profile.address.subStreet }),
                            ...(data.profile.address.buildingName && { buildingName: data.profile.address.buildingName }),
                            ...(data.profile.address.flatNumber && { flatNumber: data.profile.address.flatNumber }),
                            ...(data.profile.address.buildingNumber && { buildingNumber: data.profile.address.buildingNumber }),
                        }
                    })
                },
                ...(data.id && { id: data.id }),
                ...(data.currency && { currency: data.currency }),
                ...(data.institutionName && { institutionName: data.institutionName }),
                ...(data.institutionAddress && {
                    institutionAddress: {
                        ...(data.institutionAddress.country && { country: data.institutionAddress.country }),
                        ...(data.institutionAddress.postCode && { postCode: data.institutionAddress.postCode }),
                        ...(data.institutionAddress.state && { state: data.institutionAddress.state }),
                        ...(data.institutionAddress.town && { town: data.institutionAddress.town }),
                        ...(data.institutionAddress.street && { street: data.institutionAddress.street }),
                        ...(data.institutionAddress.subStreet && { subStreet: data.institutionAddress.subStreet }),
                        ...(data.institutionAddress.buildingName && { buildingName: data.institutionAddress.buildingName }),
                        ...(data.institutionAddress.flatNumber && { flatNumber: data.institutionAddress.flatNumber }),
                        ...(data.institutionAddress.buildingNumber && { buildingNumber: data.institutionAddress.buildingNumber }),
                    }
                }),
                ...(data.description && {
                    description: data.description,
                })
            };


            const response = await kyInstance.put(`wallet/counterparty/${counterPartyUuid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    json: payload
                }
            );
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error)
            throw new Error("Update a counterparty for Crypto");
        }
    },

    updateCounterPartyForACH: async (token, counterPartyUuid, data) => {
        try {
            const payload = {
                type: data.type,
                rail: "ACH",
                accountNumber: data.accountNumber,
                walletType: "INSTITUTION",
                profile: {
                    profileType: data.profile.profileType,
                    name: data.profile.name,
                    relationshipToCustomer: data.profile.relationshipToCustomer,
                    ...(data.profile.email && { email: data.profile.email }),
                    ...(data.profile.telephoneNumber && { telephoneNumber: data.profile.telephoneNumber }),
                    ...(data.profile.taxReferenceNumber && { taxReferenceNumber: data.profile.taxReferenceNumber }),
                    ...(data.profile.lineOfBusiness && { lineOfBusiness: data.profile.lineOfBusiness }),
                    ...(data.profile.address && {
                        address: {
                            ...(data.profile.address.country && { country: data.profile.address.country }),
                            ...(data.profile.address.postCode && { postCode: data.profile.address.postCode }),
                            ...(data.profile.address.state && { state: data.profile.address.state }),
                            ...(data.profile.address.town && { town: data.profile.address.town }),
                            ...(data.profile.address.street && { street: data.profile.address.street }),
                            ...(data.profile.address.subStreet && { subStreet: data.profile.address.subStreet }),
                            ...(data.profile.address.buildingName && { buildingName: data.profile.address.buildingName }),
                            ...(data.profile.address.flatNumber && { flatNumber: data.profile.address.flatNumber }),
                            ...(data.profile.address.buildingNumber && { buildingNumber: data.profile.address.buildingNumber }),
                        }
                    })
                },
                ...(data.id && { id: data.id }),
                ...(data.currency && { currency: data.currency }),
                ...(data.institutionName && { institutionName: data.institutionName }),
                ...(data.institutionAddress && {
                    institutionAddress: {
                        ...(data.institutionAddress.country && { country: data.institutionAddress.country }),
                        ...(data.institutionAddress.postCode && { postCode: data.institutionAddress.postCode }),
                        ...(data.institutionAddress.state && { state: data.institutionAddress.state }),
                        ...(data.institutionAddress.town && { town: data.institutionAddress.town }),
                        ...(data.institutionAddress.street && { street: data.institutionAddress.street }),
                        ...(data.institutionAddress.subStreet && { subStreet: data.institutionAddress.subStreet }),
                        ...(data.institutionAddress.buildingName && { buildingName: data.institutionAddress.buildingName }),
                        ...(data.institutionAddress.flatNumber && { flatNumber: data.institutionAddress.flatNumber }),
                        ...(data.institutionAddress.buildingNumber && { buildingNumber: data.institutionAddress.buildingNumber }),
                    }
                }),
                ...(data.description && {
                    description: data.description,
                }),
                ...(data.routingNumber && {
                    routingNumber: data.routingNumber,
                })
            };


            const response = await kyInstance.put(`wallet/counterparty/${counterPartyUuid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    json: payload
                }
            );
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error)
            throw new Error("Update a counterparty for ACH");
        }
    },

    updateCounterPartyForFedwire: async (token, counterPartyUuid, data) => {
        try {
            const payload = {
                type: data.type,
                rail: "FEDWIRE",
                routingNumber: data.routingNumber,
                accountNumber: data.accountNumber,
                walletType: "INSTITUTION",
                profile: {
                    profileType: data.profile.profileType,
                    name: data.profile.name,
                    relationshipToCustomer: data.profile.relationshipToCustomer,
                    ...(data.profile.email && { email: data.profile.email }),
                    ...(data.profile.telephoneNumber && { telephoneNumber: data.profile.telephoneNumber }),
                    ...(data.profile.taxReferenceNumber && { taxReferenceNumber: data.profile.taxReferenceNumber }),
                    ...(data.profile.lineOfBusiness && { lineOfBusiness: data.profile.lineOfBusiness }),
                    ...(data.profile.address && {
                        address: {
                            ...(data.profile.address.country && { country: data.profile.address.country }),
                            ...(data.profile.address.postCode && { postCode: data.profile.address.postCode }),
                            ...(data.profile.address.state && { state: data.profile.address.state }),
                            ...(data.profile.address.town && { town: data.profile.address.town }),
                            ...(data.profile.address.street && { street: data.profile.address.street }),
                            ...(data.profile.address.subStreet && { subStreet: data.profile.address.subStreet }),
                            ...(data.profile.address.buildingName && { buildingName: data.profile.address.buildingName }),
                            ...(data.profile.address.flatNumber && { flatNumber: data.profile.address.flatNumber }),
                            ...(data.profile.address.buildingNumber && { buildingNumber: data.profile.address.buildingNumber }),
                        }
                    })
                },
                ...(data.id && { id: data.id }),
                ...(data.currency && { currency: data.currency }),
                ...(data.institutionName && { institutionName: data.institutionName }),
                ...(data.institutionAddress && {
                    institutionAddress: {
                        ...(data.institutionAddress.country && { country: data.institutionAddress.country }),
                        ...(data.institutionAddress.postCode && { postCode: data.institutionAddress.postCode }),
                        ...(data.institutionAddress.state && { state: data.institutionAddress.state }),
                        ...(data.institutionAddress.town && { town: data.institutionAddress.town }),
                        ...(data.institutionAddress.street && { street: data.institutionAddress.street }),
                        ...(data.institutionAddress.subStreet && { subStreet: data.institutionAddress.subStreet }),
                        ...(data.institutionAddress.buildingName && { buildingName: data.institutionAddress.buildingName }),
                        ...(data.institutionAddress.flatNumber && { flatNumber: data.institutionAddress.flatNumber }),
                        ...(data.institutionAddress.buildingNumber && { buildingNumber: data.institutionAddress.buildingNumber }),
                    }
                }),
                ...(data.description && {
                    description: data.description,
                }),
            };


            const response = await kyInstance.put(`wallet/counterparty/${counterPartyUuid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    json: payload
                }
            );
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error)
            throw new Error("Update a counterparty for FEDWIRE");
        }
    },

    updateCounterPartyForSwift: async (token, counterPartyUuid, data) => {
        try {
            const payload = {
                type: data.type,
                rail: "SWIFT",
                accountNumber: data.accountNumber,
                walletType: "INSTITUTION",
                profile: {
                    profileType: data.profile.profileType,
                    name: data.profile.name,
                    relationshipToCustomer: data.profile.relationshipToCustomer,
                    ...(data.profile.email && { email: data.profile.email }),
                    ...(data.profile.telephoneNumber && { telephoneNumber: data.profile.telephoneNumber }),
                    ...(data.profile.taxReferenceNumber && { taxReferenceNumber: data.profile.taxReferenceNumber }),
                    ...(data.profile.lineOfBusiness && { lineOfBusiness: data.profile.lineOfBusiness }),
                    ...(data.profile.address && {
                        address: {
                            ...(data.profile.address.country && { country: data.profile.address.country }),
                            ...(data.profile.address.postCode && { postCode: data.profile.address.postCode }),
                            ...(data.profile.address.state && { state: data.profile.address.state }),
                            ...(data.profile.address.town && { town: data.profile.address.town }),
                            ...(data.profile.address.street && { street: data.profile.address.street }),
                            ...(data.profile.address.subStreet && { subStreet: data.profile.address.subStreet }),
                            ...(data.profile.address.buildingName && { buildingName: data.profile.address.buildingName }),
                            ...(data.profile.address.flatNumber && { flatNumber: data.profile.address.flatNumber }),
                            ...(data.profile.address.buildingNumber && { buildingNumber: data.profile.address.buildingNumber }),
                        }
                    })
                },
                ...(data.id && { id: data.id }),
                ...(data.currency && { currency: data.currency }),
                ...(data.institutionName && { institutionName: data.institutionName }),
                ...(data.institutionAddress && {
                    institutionAddress: {
                        ...(data.institutionAddress.country && { country: data.institutionAddress.country }),
                        ...(data.institutionAddress.postCode && { postCode: data.institutionAddress.postCode }),
                        ...(data.institutionAddress.state && { state: data.institutionAddress.state }),
                        ...(data.institutionAddress.town && { town: data.institutionAddress.town }),
                        ...(data.institutionAddress.street && { street: data.institutionAddress.street }),
                        ...(data.institutionAddress.subStreet && { subStreet: data.institutionAddress.subStreet }),
                        ...(data.institutionAddress.buildingName && { buildingName: data.institutionAddress.buildingName }),
                        ...(data.institutionAddress.flatNumber && { flatNumber: data.institutionAddress.flatNumber }),
                        ...(data.institutionAddress.buildingNumber && { buildingNumber: data.institutionAddress.buildingNumber }),
                    }
                }),
                ...(data.description && {
                    description: data.description,
                }),
                ...(data.swiftBic && {
                    swiftBic: data.swiftBic,
                }),
                
                ...(data.intermediary && {
                    intermediary: {
                        currency: data.intermediary.currency,
                        institutionName: data.intermediary.institutionName,
                        ...(data.intermediary.institutionAddress && {
                            institutionAddress: {
                                ...(data.intermediary.institutionAddress.country && { country: data.intermediary.institutionAddress.country }),
                                ...(data.intermediary.institutionAddress.postCode && { postCode: data.intermediary.institutionAddress.postCode }),
                                ...(data.intermediary.institutionAddress.state && { state: data.intermediary.institutionAddress.state }),
                                ...(data.intermediary.institutionAddress.town && { town: data.intermediary.institutionAddress.town }),
                                ...(data.intermediary.institutionAddress.street && { street: data.intermediary.institutionAddress.street }),
                                ...(data.intermediary.institutionAddress.subStreet && { subStreet: data.intermediary.institutionAddress.subStreet }),
                                ...(data.intermediary.institutionAddress.buildingName && { buildingName: data.intermediary.institutionAddress.buildingName }),
                                ...(data.intermediary.institutionAddress.flatNumber && { flatNumber: data.intermediary.institutionAddress.flatNumber }),
                                ...(data.intermediary.institutionAddress.buildingNumber && { buildingNumber: data.intermediary.institutionAddress.buildingNumber }),
                            }
                        }),
                        ...(data.intermediary.swiftBic && {
                            swiftBic: data.intermediary.swiftBic
                        }),
                        ...(data.intermediary.routingNumber && {
                            routingNumber: data.intermediary.routingNumber
                        })

                    }
                }),

            };


            const response = await kyInstance.put(`wallet/counterparty/${counterPartyUuid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    json: payload
                }
            );
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error)
            throw new Error("Update a counterparty for SWIFT");
        }
    },

    updateCounterPartyForSepa: async (token, counterPartyUuid, data) => {
        try {
            const payload = {
                type: data.type,
                rail: "SEPA",
                walletType: "INSTITUTION",
                ...(data.id && { id: data.id }),
                ...(data.currency && { currency: data.currency }),
                ...(data.description && {
                    description: data.description,
                }),
                ...(data.institutionAddress && {
                    institutionAddress: {
                        ...(data.institutionAddress.country && { country: data.institutionAddress.country }),
                        ...(data.institutionAddress.postCode && { postCode: data.institutionAddress.postCode }),
                        ...(data.institutionAddress.state && { state: data.institutionAddress.state }),
                        ...(data.institutionAddress.town && { town: data.institutionAddress.town }),
                        ...(data.institutionAddress.street && { street: data.institutionAddress.street }),
                        ...(data.institutionAddress.subStreet && { subStreet: data.institutionAddress.subStreet }),
                        ...(data.institutionAddress.buildingName && { buildingName: data.institutionAddress.buildingName }),
                        ...(data.institutionAddress.flatNumber && { flatNumber: data.institutionAddress.flatNumber }),
                        ...(data.institutionAddress.buildingNumber && { buildingNumber: data.institutionAddress.buildingNumber }),
                    }
                }),
                profile: {
                    profileType: data.profile.profileType,
                    name: data.profile.name,
                    relationshipToCustomer: data.profile.relationshipToCustomer,
                    ...(data.profile.email && { email: data.profile.email }),
                    ...(data.profile.telephoneNumber && { telephoneNumber: data.profile.telephoneNumber }),
                    ...(data.profile.taxReferenceNumber && { taxReferenceNumber: data.profile.taxReferenceNumber }),
                    ...(data.profile.lineOfBusiness && { lineOfBusiness: data.profile.lineOfBusiness }),
                    ...(data.profile.address && {
                        address: {
                            ...(data.profile.address.country && { country: data.profile.address.country }),
                            ...(data.profile.address.postCode && { postCode: data.profile.address.postCode }),
                            ...(data.profile.address.state && { state: data.profile.address.state }),
                            ...(data.profile.address.town && { town: data.profile.address.town }),
                            ...(data.profile.address.street && { street: data.profile.address.street }),
                            ...(data.profile.address.subStreet && { subStreet: data.profile.address.subStreet }),
                            ...(data.profile.address.buildingName && { buildingName: data.profile.address.buildingName }),
                            ...(data.profile.address.flatNumber && { flatNumber: data.profile.address.flatNumber }),
                            ...(data.profile.address.buildingNumber && { buildingNumber: data.profile.address.buildingNumber }),
                        }
                    })
                },
                ...(data.iban && { iban: data.iban }),
                ...(data.swiftBic && {
                    swiftBic: data.swiftBic,
                }),
            };


            const response = await kyInstance.put(`wallet/counterparty/${counterPartyUuid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    json: payload
                }
            );
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.log(error)
            throw new Error("Update a counterparty for SEPA");
        }
    },

    ////////////////////////////////////////////////////////////////////////////////
    deleteCounterPartyById: async (token, uuid) => {

        try {
            const response = await kyInstance.delete(`wallet/counterparty/${uuid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error)
            throw new Error("Delete a counterparty by ID");
        }
    },

    getCounterParties: async (token, page, size) => {

        try {
            const queryParams = new URLSearchParams();
            if(page) queryParams.append("page", page);
            if(size) queryParams.append("size", size);

            const response = await kyInstance.get(`wallet/counterparty?${queryParams.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error)
            throw new Error("Get counterparties for current user");
        }
    },

}


export default counterPartyService;
