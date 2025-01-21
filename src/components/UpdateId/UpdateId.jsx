'use client'
import { useEffect } from "react"
import { useId } from "../Context/Id"

export default function UpdateId ({id}) {
    const { setId } = useId();
    useEffect(() => {
        setId(id)
    },[id])
}