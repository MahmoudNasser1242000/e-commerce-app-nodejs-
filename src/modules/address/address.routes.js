import { Router } from "express";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addressIdSchema, addToAddressSchema, updateInAddressSchema } from "./address.validation.js";
import { addToAddress, getAllFromAddress, removeFromAddress, updateInAddress } from "./address.controller.js";
import protectAuth from "../../middlewares/protectAuth.js";

const addressRouter = Router();

addressRouter.route("/")
    .post(
        protectAuth,
        schemaValidation(addToAddressSchema),
        addToAddress
    )
    .get(
        protectAuth,
        getAllFromAddress
    )

addressRouter.route("/:address")
    .delete(
        protectAuth,
        schemaValidation(addressIdSchema),
        removeFromAddress
    )
    .patch(
        protectAuth,
        schemaValidation(updateInAddressSchema),
        updateInAddress
    );

export default addressRouter;
