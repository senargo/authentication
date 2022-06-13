import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

import File from '../models/File';
import User from '../models/User';
import Group from '../models/Group';
import UserGroup from '../models/UserGroup';

class ImportUserController {
  async store(req, res) {
    const { fileid } = req.params;

    const arrUsers = [];
    const arrResult = [];

    if (!fileid) {
      return res.status(401).json({ error: 'No file id sent' });
    }

    const file = await File.findOne({
      where: { id: fileid },
    });

    await fs
      .createReadStream(
        path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', file.path)
      )
      .pipe(csv())
      .on('data', data => arrUsers.push(data))
      .on('end', () => {
        arrUsers.map(async user => {
          const userExists = await User.findOne({
            where: { email: user.email },
          });

          // If user exists, but is not in the group
          if (userExists) {
            if (user.groupid) {
              const groupExists = await Group.findOne({
                where: { id: user.groupid },
              });

              if (groupExists) {
                const userInGroup = await UserGroup.findOne({
                  where: { user_id: userExists.id, group_id: user.groupid },
                });

                if (!userInGroup) {
                  UserGroup.create({
                    user_id: userExists.id,
                    group_id: user.groupid,
                  });
                }
              }
            }
          }

          // if user does not exists
          if (!userExists) {
            const {
              id,
              name,
              email,
              phone1,
              phone2,
              city,
              state,
            } = await User.create(user);

            if (user.groupid) {
              const groupExists = await Group.findOne({
                where: { id: user.groupid },
              });

              if (groupExists) {
                UserGroup.create({
                  user_id: id,
                  group_id: user.groupid,
                });
              }
            }

            arrResult.push({
              name,
              email,
              phone1,
              phone2,
              city,
              state,
            });
          }
        });
      })
      .on('error', err => console.log(err));

    console.log(`Tamanho: ${arrResult.length}`);
    return res.json(arrResult);
  }
}

export default new ImportUserController();
