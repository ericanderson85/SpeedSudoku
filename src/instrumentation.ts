import connect from '@/lib/db'
import mongoose from 'mongoose';
// import loadPuzzles from './lib/loadPuzzles';

export async function register() {
    await connect();
    // await loadPuzzles();
}