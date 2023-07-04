import TestClass from '../services/test.service';
import { Request, Response } from 'express';
import { makeResponse } from '../libs';

export default class TestController extends TestClass {
	public testFunc = async (req: Request, res: Response): Promise<any> => {
		try {   
			const data = await this.testRun();
			res.send(makeResponse(data));
		} catch (err: any) {
			res.send(makeResponse(err.message, {}, 'Failed', true));
		}
	};
}
