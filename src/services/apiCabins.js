import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
    let { data: cabins, error } = await supabase.from('cabins').select('*').order('id', { ascending: false });
    if (error) {
        console.log(error);
        throw new Error('Cabins could not be loaded');
    }
    return cabins;
}

export async function createEditCabin(newCabin, cabinId) {
    const isOldImage = typeof newCabin.image === 'string' && newCabin.image?.startsWith(supabaseUrl);

    let imagePath;
    let imageName;

    if(!isOldImage) {
        imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
        imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
        const { error: uploadImageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image);
    
        if (uploadImageError) {
            await supabase.from('cabins').delete().eq('id', data.id)
            throw new Error('Cabin image could not be uploaded and the cabin was not created ');
        }
    } else {
        imagePath = newCabin.image;
    }
    
    let query = supabase.from('cabins');

    if(!cabinId) {
        query = query.insert([{ ...newCabin, image: imagePath }]);
    } else {
        query = query.update({...newCabin, image: imagePath }).eq('id', cabinId);
    }
    
    const { data, error } = await query.select().single();
    
    if (error) {
        console.log(error);
        throw new Error('Cabin could not be created');
    }


    return data;
}

export const deleteCabin = async function (id) {
    const { data, error } = await supabase.from('cabins').delete().eq('id', id);
    if (error) {
        console.log(error);
        throw new Error('Cabin could not be deleted');
    }

    return data;
};
