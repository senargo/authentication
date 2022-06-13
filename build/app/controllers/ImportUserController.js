"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _csvparser = require('csv-parser'); var _csvparser2 = _interopRequireDefault(_csvparser);
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Group = require('../models/Group'); var _Group2 = _interopRequireDefault(_Group);
var _UserGroup = require('../models/UserGroup'); var _UserGroup2 = _interopRequireDefault(_UserGroup);

class ImportUserController {
  async store(req, res) {
    const { fileid } = req.params;

    const arrUsers = [];
    const arrResult = [];

    if (!fileid) {
      return res.status(401).json({ error: 'No file id sent' });
    }

    const file = await _File2.default.findOne({
      where: { id: fileid },
    });

    await _fs2.default
      .createReadStream(
        _path2.default.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', file.path)
      )
      .pipe(_csvparser2.default.call(void 0, ))
      .on('data', data => arrUsers.push(data))
      .on('end', () => {
        arrUsers.map(async user => {
          const userExists = await _User2.default.findOne({
            where: { email: user.email },
          });

          // If user exists, but is not in the group
          if (userExists) {
            if (user.groupid) {
              const groupExists = await _Group2.default.findOne({
                where: { id: user.groupid },
              });

              if (groupExists) {
                const userInGroup = await _UserGroup2.default.findOne({
                  where: { user_id: userExists.id, group_id: user.groupid },
                });

                if (!userInGroup) {
                  _UserGroup2.default.create({
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
            } = await _User2.default.create(user);

            if (user.groupid) {
              const groupExists = await _Group2.default.findOne({
                where: { id: user.groupid },
              });

              if (groupExists) {
                _UserGroup2.default.create({
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

exports. default = new ImportUserController();
