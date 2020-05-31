const MySqlProfileRepository = require("../infrastructure/mysql_profile_repository");
const ProfileUpdater = require("../aplication/update/profile_updater");
const MySqlLocationRepository = require("../../location/infrastructure/mysql_location_repository");
const LocationUpdater = require("../../location/aplication/update/location_updater");

const NoContentReponse = require("../../../shared/domain/response/no_content_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.updateProfile = async (event) => {
    const { pathParameters } = event;
    const bodyRequest = JSON.parse(event.body);
    let response;
    try {
        const profileUpdater = new ProfileUpdater(new MySqlProfileRepository());
        await profileUpdater.call(
            { ...bodyRequest, ...{ idProfile: pathParameters.id } },
            new LocationUpdater(new MySqlLocationRepository())
        );
        response = new NoContentReponse();
    } catch (error) {
        throw error;
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
