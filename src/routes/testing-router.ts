import {Router} from "express";
import {testingRepository} from "../repositories/testing-repository";

export const testsRouter = Router({})


testsRouter.delete('/all-data', async (req, res) => {

    const result = await testingRepository.deleteAllData()

    if(result) return res.sendStatus(204)

    return res.sendStatus(500)

})