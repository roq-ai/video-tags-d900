import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { keywordValidationSchema } from 'validationSchema/keywords';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.keyword
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getKeywordById();
    case 'PUT':
      return updateKeywordById();
    case 'DELETE':
      return deleteKeywordById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getKeywordById() {
    const data = await prisma.keyword.findFirst(convertQueryToPrismaUtil(req.query, 'keyword'));
    return res.status(200).json(data);
  }

  async function updateKeywordById() {
    await keywordValidationSchema.validate(req.body);
    const data = await prisma.keyword.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteKeywordById() {
    const data = await prisma.keyword.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
