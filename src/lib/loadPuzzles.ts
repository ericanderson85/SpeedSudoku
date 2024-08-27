// import Puzzle from "@/models/Puzzle";
// import fs from 'fs';

// export default async function loadPuzzles() {
//     const filePath = '/Users/ericanderson/Desktop/sudoku-next/sudoku_puzzle_elo.json';

//     fs.readFile(filePath, 'utf8', async (err, data) => {
//         if (err) {
//             console.error('Error reading file', err);
//             return;
//         }

//         try {
//             const jsonData = JSON.parse(data);
//             if (Array.isArray(jsonData)) {
//                 console.log(`Found ${jsonData.length} puzzles in the file.`);

//                 for (let i = 0; i < jsonData.length; i++) {
//                     try {
//                         const puzzle = jsonData[i];
//                         await Puzzle.create(puzzle);
//                         console.log(`Puzzle ${i + 1} inserted successfully`);
//                     } catch (insertError) {
//                         console.error(`Error inserting puzzle ${i + 1}:`, insertError);
//                     }
//                 }

//                 console.log('All puzzles processed');
//             } else {
//                 console.error('Invalid JSON format');
//             }
//         } catch (parseError) {
//             console.error('Error parsing JSON', parseError);
//         }
//     });
// }
