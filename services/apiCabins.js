import supabase from './supabase';

export async function getCabins() {
    let { data: cabins, error } = await supabase.from('cabins').select('*');
    if (error) {
        console.log(error);
        throw new Error('Cabins could not be loaded');
    }
    return cabins;
}

export const deleteCabin = async function (id) {
    const { data, error } = await supabase.from('cabins').delete().eq('id', id);
    if(error) {
        console.log(error);
        throw new Error('Cabin could not be deleted');
    }

    return data;
};
