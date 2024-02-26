import posterModel from '@server/model/Poster';
import ResBody from '@server/struct/ResBody';
import { Router } from 'express';

const posterRouter = Router();

posterRouter.post('/poster/create', async (req, res) => {
  const { schema } = req.body;
  if (schema) {
    const record = await posterModel.create({
      schema: JSON.stringify(schema),
    });
    res.json({
      data: {
        id: record.id,
      },
    });
  } else {
    throw new Error('400-参数错误');
  }
});

posterRouter.get('/poster/find', async (req, res) => {
  const { id } = req.query;
  if (id) {
    const record = await posterModel.findByPk(Number(id));
    if (record) {
      res.json(
        new ResBody({
          data: {
            schema: JSON.parse(record.schema),
          },
        })
      );
    } else {
      throw new Error('404-海报不存在');
    }
  } else {
    throw new Error('400-参数错误');
  }
});

export default posterRouter;
