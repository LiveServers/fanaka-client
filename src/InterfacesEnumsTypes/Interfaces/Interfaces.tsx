
export interface HeaderProps {
    projectName: String,
    course: String,
    time?: String
}

export interface FooterProps {
    footerMessage:String
}

export interface BreadCrumbs {
    name:string,
    path:string
}

export interface DisplayCardsProps {
    icon:any,
    text:string,
    value:string
}

export interface Semester {
    text:string,
    path:string,
    
}

export interface SemesterCardProps {
    _id:string,
    year:string,
    semester:string,
    path:string
}