import { request } from 'express';
import db, { sequelize } from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async(req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("homepage.ejs", {data: JSON.stringify(data)});
    } catch (e) {
        console.log(e);
    }
}

let getAbout = (req, res) => {
    return res.render('aboutme.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async(req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.redirect('/get-crud');
}

let displayGetCRUD = async(req, res) => {
    let data = await CRUDService.getAllUser(req.query.search);
    // let [data] = await sequelize.query("Select * From Users where lastName like :search",
    // { replacements: {search: `%${req.query.search}%`}});
    // if(req.query.search)
    // [data] = await sequelize.query("Select * From Users where firstName like $1 or lastName like $1",{
    //     bind: [`%${req.query.search}%`]
    // });
    return res.render('displayCRUD.ejs', {dataTable: data});
}
 
let getEditCRUD = async(req, res) => {
    let usId = req.query.id;
    if(usId){
        let userData = await CRUDService.getUserById(usId);
        if(userData){
            return res.render('editCRUD.ejs', {dataTable: userData});
        }
    }
    else{
        return res.send('User not found');
    }
}

let putCRUD = async(req, res) => {
    let data = req.body;
    await CRUDService.updateUserData(data);
    return res.redirect('/get-crud');
}

let delCRUD = async(req, res) => {
    await CRUDService.delCRUD(req.query.id);
    return res.redirect('/get-crud');
}

module.exports = {
    getHomePage, getAbout, getCRUD, postCRUD, displayGetCRUD, getEditCRUD, putCRUD, delCRUD
}