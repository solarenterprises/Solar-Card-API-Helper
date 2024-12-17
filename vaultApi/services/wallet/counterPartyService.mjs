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

    createNewCounterPartyForCrypto: async (token, data) => {

        try {
            const payload = {
                type: data.type,
                rail: data.rail,
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
                description: data.description,

            };


            const response = await kyInstance.get(`wallet/counterparty`,
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
            throw new Error("Create a counterparty");
        }
    },

}


export default counterPartyService;