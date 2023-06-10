import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { account, device, role, service } from "../../types";
import { db } from "./index";

export const addData = async (
    data: device | account | role | service,
    nameColection: string
) => {
    try {
        const { id, ...value } = data;
        const docRef = await addDoc(collection(db, nameColection), value);
        return { status: true, data: { ...value, id: docRef.id } };
    } catch (error) {
        return { status: false, data: undefined };
    }
};

export const getAllDataInColection = async (nameColection: string) => {
    let res: any[] = [];
    const querySnapshot = await getDocs(collection(db, nameColection));
    querySnapshot.forEach((doc) => {
        return res.push({ ...doc.data(), id: doc.id });
    });
    return res;
};

export const updateData = async (
    data: device | account | role | service,
    nameColection: string
) => {
    try {
        const { id, ...value } = data;
        await setDoc(doc(db, nameColection, id), value);
        return data as device & account & service;
    } catch (error) {
        return null;
    }
};

export const addDatas = async (
    data: device[] | service[] | role[],
    nameColection: string
) => {
    data.forEach(async (item) => {
        const { id, ...value } = item;
        const docRef = await addDoc(collection(db, nameColection), value);
        console.log("Document written with ID: ", docRef.id);
    });
};

export const getDocumentWithId = async (id: string, nameColection: string) => {
    let res: any = {}
    const q = query(collection(db, nameColection), where("__name__", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        res = { ...doc.data(), id: doc.id }
    });
    return res;
};
