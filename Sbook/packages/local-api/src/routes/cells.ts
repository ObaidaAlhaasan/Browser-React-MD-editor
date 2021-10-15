import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();


interface Cell {
    id: string;
    content: string;
    type: 'Code' | 'Text';
}

export const createCellsRouter = (fileName: string, dirName: string) => {
    const fullPath = path.join(dirName, fileName);
    router.use(express.json());

    router.get("/cells", async (req, res, next) => {

        try {
            const cells: string = await fs.readFile(fullPath, 'utf-8');

            return res.json({ isSuccessful: true, cells: JSON.parse(cells) as Cell[], msgAsString: 'Okay' });
        } catch (error: any) {
            if (error.code === "ENOENT") {
                // add default cells
                const defaultCells: Cell[] = [];
                await fs.writeFile(fullPath, JSON.stringify(defaultCells), 'utf-8');
                return res.json({ isSuccessful: true, cells: defaultCells, msgAsString: 'Okay a default cells has been created!' });
            }

            return res.json({ isSuccessful: false, msgAsString: error.message });
        }
    });


    router.post("/cells", async (req, res, next) => {
        const { cells }: { cells: Cell[] } = req.body;
        try {
            await fs.writeFile(fullPath, JSON.stringify(cells));
        } catch (error: any) {
            return res.json({ isSuccessful: false, msgAsString: error.message });
        }

        return res.json({ isSuccessful: true, msgAsString: 'Okay' });
    });

    return router;
};