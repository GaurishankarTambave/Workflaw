import { Request , Router, Response} from 'express';
import Workflow from '../controller/workflow';
import { statusCode } from '../enum/statusCode';
const router = Router();


router.post('/workflow/execute', async function (req: Request, res: any) {
	try {
        console.log(req.body);
        let executeResult: any = await Workflow.executeWorkfow(req);
        if (!executeResult.success) {
            return res.status(statusCode.BADREQUEST).json({message: executeResult, statusCode: statusCode.BADREQUEST});
        }
        return res.status(statusCode.CREATED).send('Workflow executed successfully');
	} catch (error) {
		res.json(error);
	}
});

export default router;