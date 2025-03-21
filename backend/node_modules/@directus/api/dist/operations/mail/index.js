import { defineOperationApi } from '@directus/extensions';
import { MailService } from '../../services/mail/index.js';
import { md } from '../../utils/md.js';
import { useLogger } from '../../logger/index.js';
const logger = useLogger();
export default defineOperationApi({
    id: 'mail',
    handler: async ({ body, template, data, to, type, subject, cc, bcc, replyTo }, { accountability, database, getSchema }) => {
        const mailService = new MailService({ schema: await getSchema({ database }), accountability, knex: database });
        const mailObject = { to, subject, cc, bcc, replyTo };
        const safeBody = typeof body !== 'string' ? JSON.stringify(body) : body;
        if (type === 'template') {
            mailObject.template = {
                name: template || 'base',
                data: data || {},
            };
        }
        else {
            mailObject.html = type === 'wysiwyg' ? safeBody : md(safeBody);
        }
        mailService.send(mailObject).catch((error) => {
            logger.error(error, 'Could not send mail in "mail" operation');
        });
    },
});
