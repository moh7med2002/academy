import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
export default function AddGroup() {
    const { currentTeacher } = useSelector((state) => state.teacher);
    const [teachers,setTeachers] = useState([])
    const [subjects,setSubjects] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/api/teacher/all`,{
            headers:{
            "Authorization":currentTeacher.token
        },
        })
        .then((res) => res.json())
        .then((data) => setTeachers(data.teachers));
    
        fetch(`${process.env.REACT_APP_API}/api/subject/all`,{
            headers:{
            "Authorization":currentTeacher.token
        }
        })
        .then((res) => res.json())
        .then((data) => setSubjects(data.subjects));
    
        fetch(`${process.env.REACT_APP_API}/api/course/all`,
        {
        headers:{
            "Authorization":currentTeacher.token
        }
        })
    }, []);
    return (
        <div>
        
        </div>
    )
}
