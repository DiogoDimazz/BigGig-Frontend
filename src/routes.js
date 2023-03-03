import { Test } from './Components/Test/Test'
import Main from './Pages/Main/Main'
import { Routes, Route } from 'react-router-dom'

export default function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/teste' element={<Test/>}/>
        </Routes>
    )
}