import {} from 'knex';
export const getFilesizeSum = async (db) => {
    const query = (await db.sum({ total: 'filesize' }).from('directus_files').first());
    return {
        total: query?.total ? Number(query.total) : 0,
    };
};
