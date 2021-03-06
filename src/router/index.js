import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import activate from '../components/activate'
import findkey1 from '../components/findkey1'
import findkey2 from '../components/findkey2'
import ChangeEmail from '../components/Account/ChangeEmail'
import homePage from '../components/HomePage'
import CoursePage from '../components/Courses/CoursePage'
import Seminaring from '../components/Courses/Seminaring/Seminaring'
import download from '../components/Courses/Seminaring/download'
import present from '../components/Courses/Seminaring/present'
import beforeSeminar from '../components/Courses/BeforeSeminar/BeforeSeminar'
import signInfo from '../components/Courses/BeforeSeminar/signInfo'
import AfterSign from '../components/Courses/BeforeSeminar/AfterSign'
import ChangeSign from '../components/Courses/BeforeSeminar/ChangeSign'
import ChangeSign2 from '../components/Courses/BeforeSeminar/ChangeSign2'
import CheckGrade from '../components/Courses/BeforeSeminar/CheckGrade'
import TotalSeminars from '../components/Courses/TotalSeminars'
import SeminarInfo from '../components/Courses/AfterSeminar/SeminarInfo'
import CheckInfo from '../components/Courses/AfterSeminar/CheckInfo'
import ManageAccount from '../components/Account/ManageAccount'
import MyCourse from '../components/Courses/MyCourse'
import Grade from '../components/Courses/AllGrade/Grade'
import ScourseInfo from '../components/Courses/CourseInfo'
import TeamInfo from '../components/Courses/MyTeam/TeamInfo'
import MakeTeam from '../components/Courses/MyTeam/MakeTeam'
import TeamManage from '../components/Courses/MyTeam/TeamManage'
import WithDraw from '../components/Courses/MyTeam/WithDraw'

import FindPassword from "../components/teacher/FindPassword";
import HomePage from "../components/teacher/HomePage";
import SetPassword from "../components/teacher/SetPassword";
import Login from "../components/Login";
import AccountManage from "../components/teacher/AccountManage";
import EditEmail from "../components/teacher/EditEmail";
import SeminarPage from "../components/teacher/SeminarPage";
import EditPassword from "../components/teacher/EditPassword";
import CourseManage from "../components/teacher/CourseManage";
import NewCourse from "../components/teacher/NewCourse";
import NewSeminar from "../components/teacher/NewSeminar";
import SetRound from "../components/teacher/SetRound";
import StartSeminar from "../components/teacher/StartSeminar";
import SuspendSeminar from "../components/teacher/SuspendSeminar";
import BeforeSeminar from "../components/teacher/BeforeSeminar";
import UpdateSeminarInfo from "../components/teacher/UpdateSeminarInfo";
import AfterSeminar from "../components/teacher/AfterSeminar";
import ReportPage from "../components/teacher/ReportPage";
import ResultsPage from "../components/teacher/ResultsPage";
import UpdateReportGrade from "../components/teacher/UpdateReportGrade";
import CourseInfo from "../components/teacher/CourseInfo";
import StudentGrades from "../components/teacher/StudentGrades";
import StudentGroups from "../components/teacher/StudentGroups";
import ClassInfo from "../components/teacher/ClassInfo";
import NewClass from "../components/teacher/NewClass";
import AddShare from "../components/teacher/AddShare";
import SharePage from "../components/teacher/SharePage";
import Backlog from "../components/teacher/Backlog";
import OngoingSeminar from "../components/teacher/OngoingSeminar";
import CheckInformation from "../components/teacher/CheckInformation";
import DownloadPPT from "../components/teacher/DownloadPPT";
import TotalSeminar from "../components/teacher/TotalSeminar";
import TeamRequires from "../components/teacher/TeamRequires";
import SetTeamRequires from "../components/teacher/SetTeamRequires";
import Activate from "../components/teacher/Activate";



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/activate',
      name: 'activate',
      component: activate
    },
    {
      path: '/findkey1',
      name: 'findkey1',
      component: findkey1
    },
    {
      path: '/findkey2',
      name: 'findkey2',
      component: findkey2
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: homePage
    },
    {
      path: '/Account/ManageAccount',
      name: 'ManageAccount',
      component: ManageAccount
    },
    {
      path: '/Account/ChangeEmail',
      name: 'ChangeEmail',
      component: ChangeEmail
    },
    {
      path: '/Courses/CoursePage',
      name: 'CoursePage',
      component: CoursePage
    },
    {
      path: '/Courses/Seminaring/Seminaring',
      name: 'Seminaring',
      component: Seminaring
    },
    {
      path: '/Courses/BeforeSeminar/BeforeSeminar',
      name: 'BeforeSeminar',
      component: beforeSeminar
    },
    {
      path: '/Courses/Seminaring/download',
      name: 'download',
      component: download
    },
    {
      path: '/Courses/Seminaring/present',
      name: 'present',
      component: present
    },
    {
      path: '/Courses/BeforeSeminar/signInfo',
      name: 'signInfo',
      component: signInfo
    },
    {
      path: '/Courses/BeforeSeminar/AfterSign',
      name: 'AfterSign',
      component: AfterSign
    },
    {
      path: '/Courses/BeforeSeminar/ChangeSign',
      name: 'ChangeSign',
      component: ChangeSign
    },
    {
      path: '/Courses/BeforeSeminar/ChangeSign2',
      name: 'ChangeSign2',
      component: ChangeSign2
    },
    {
      path: '/Courses/BeforeSeminar/CheckGrade',
      name: 'CheckGrade',
      component: CheckGrade
    },
    {
      path: '/Courses/TotalSeminars',
      name: 'TotalSeminars',
      component: TotalSeminars
    },
    {
      path: '/Courses/AfterSeminar/SeminarInfo',
      name: 'SeminarInfo',
      component: SeminarInfo
    },
    {
      path: '/Courses/AfterSeminar/CheckInfo',
      name: 'CheckInfo',
      component: CheckInfo
    },
    {
      path: '/Courses/MyCourse',
      name: 'MyCourse',
      component: MyCourse
    },
    {
      path: '/Courses/AllGrade/Grade',
      name: 'Grade',
      component: Grade
    },
    {
      path: '/Courses/CourseInfo',
      name: 'ScourseInfo',
      component: ScourseInfo
    },
    {
      path: '/Courses/MyTeam/TeamInfo',
      name: 'TeamInfo',
      component: TeamInfo
    },
    {
      path: '/Courses/MyTeam/MakeTeam',
      name: 'MakeTeam',
      component: MakeTeam
    },
    {
      path: '/Courses/MyTeam/TeamManage',
      name: 'TeamManage',
      component: TeamManage
    },
    {
      path: '/Courses/MyTeam/WithDraw',
      name: 'WithDraw',
      component: WithDraw
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      name: 'FindPassword',
      path:'/teacher/FindPassword',
      component:FindPassword
    },
    {
      name: 'homePage',
      path:'/teacher/HomePage',
      component:HomePage
    },
    {
      name: 'SetPassword',
      path:'/teacher/SetPassword',
      component:SetPassword
    },
    {
      name: 'AccountManage',
      path:'/teacher/AccountManage',
      component:AccountManage
    },
    {
      name: 'EditEmail',
      path: '/teacher/EditEmail',
      component: EditEmail
    },
    {
      name: 'SeminarPage',
      path: '/teacher/SeminarPage',
      component: SeminarPage
    },
    {
      name: 'EditPassword',
      path: '/teacher/EditPassword',
      component: EditPassword
    },
    {
      name: 'CourseManage',
      path: '/teacher/CourseManage',
      component: CourseManage
    },
    {
      name: 'NewCourse',
      path: '/teacher/NewCourse',
      component: NewCourse
    },
    {
      name: 'NewSeminar',
      path: '/teacher/NewSeminar',
      component: NewSeminar
    },
    {
      name: 'SetRound',
      path: '/teacher/SetRound',
      component: SetRound
    },
    {
      name: 'StartSeminar',
      path: '/teacher/StartSeminar',
      component: StartSeminar
    },
    {
      name: 'PauseSeminar',
      path: '/teacher/SuspendSeminar',
      component: SuspendSeminar
    },
    {
      name: 'beforeSeminar',
      path: '/teacher/BeforeSeminar',
      component: BeforeSeminar
    },
    {
      name: 'UpdateSeminarInfo',
      path: '/teacher/UpdateSeminarInfo',
      component: UpdateSeminarInfo
    },
    {
      name: 'AfterSeminar',
      path: '/teacher/AfterSeminar',
      component: AfterSeminar
    },
    {
      name: 'ReportPage',
      path: '/teacher/ReportPage',
      component: ReportPage
    },
    {
      name: 'ResultsPage',
      path: '/teacher/ResultsPage',
      component: ResultsPage
    },
    {
      name: 'UpdateReportGrade',
      path: '/teacher/UpdateReportGrade',
      component: UpdateReportGrade
    },
    {
      name: 'CourseInfo',
      path: '/teacher/CourseInfo',
      component: CourseInfo
    },
    {
      name: 'StudentGrades',
      path: '/teacher/StudentGrades',
      component: StudentGrades
    },
    {
      name: 'StudentGroups',
      path: '/teacher/StudentGroups',
      component: StudentGroups
    },
    {
      name: 'ClassInfo',
      path: '/teacher/ClassInfo',
      component: ClassInfo
    },
    {
      name: 'SharePage',
      path: '/teacher/SharePage',
      component: SharePage
    },
    {
      name: 'NewClass',
      path: '/teacher/NewClass',
      component: NewClass
    },
    {
      name: 'AddShare',
      path: '/teacher/AddShare',
      component: AddShare
    },
    {
      name: 'Backlog',
      path: '/teacher/Backlog',
      component: Backlog
    },
    {
      name: 'OngoingSeminar',
      path: '/teacher/OngoingSeminar',
      component: OngoingSeminar
    },
    {
      name: 'CheckInformation',
      path: '/teacher/CheckInformation',
      component: CheckInformation
    },
    {
      name: 'DownloadPPT',
      path: '/teacher/DownloadPPT',
      component: DownloadPPT
    },
    {
      name: 'TotalSeminar',
      path: '/teacher/TotalSeminar',
      component: TotalSeminar
    },
    {
      name: 'TeamRequires',
      path: '/teacher/TeamRequires',
      component: TeamRequires
    },
    {
      name: 'SetTeamRequires',
      path: '/teacher/SetTeamRequires',
      component: SetTeamRequires
    },
    {
      name: 'Activate',
      path: '/teacher/Activate',
      component: Activate
    }
  ]
})
