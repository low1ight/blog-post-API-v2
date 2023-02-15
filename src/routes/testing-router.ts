import {Router} from "express";
import {testingRepository} from "../repositories/testing-repository";

export const testsRouter = Router({})


testsRouter.delete('/all-data', (req, res) => {

    testingRepository.deleteAllData()

    res.send(204)

})