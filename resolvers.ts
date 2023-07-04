import { projects } from "./dataset";
import { clients } from "./dataset";
import Project from './models/Project';
import Client from './models/Client';

const Resolvers = {
    Query:{
        getAllProjects:()=>Project.find(),
        getProject:(_:any,args:any) =>{
            console.log(args.id);
            return Project.findById(args.id);
        }
    }
};

export default Resolvers;