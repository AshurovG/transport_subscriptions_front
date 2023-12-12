import React from 'react'
import { IconProps } from '../Icon';
import styles from './ImageIcon.module.scss'

const EditIcon: React.FC<IconProps> = ({onClick}) => {
  return (
    <div className={styles.btn} onClick={onClick}>
        <svg width={30} height={30} fill='#000' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs></defs><title/><g data-name="Layer 37" id="Layer_37"><path className="cls-1" d="M24,27H2a1,1,0,0,1-1-1V2A1,1,0,0,1,2,1H24a1,1,0,0,1,1,1V26A1,1,0,0,1,24,27ZM3,25H23V3H3Z"/><path className="cls-1" d="M30,31H8a1,1,0,0,1,0-2H29V7H28a1,1,0,0,1,0-2h2a1,1,0,0,1,1,1V30A1,1,0,0,1,30,31Z"/><path className="cls-1" d="M2,21.86a1,1,0,0,1-.7-.29,1,1,0,0,1,0-1.41L5.35,16a2.67,2.67,0,0,1,3.48-.29l3.59,2.6a.68.68,0,0,0,.88-.08L17,14.51a2.75,2.75,0,0,1,3.82,0l3.88,3.93a1,1,0,0,1-1.42,1.4l-3.88-3.93a.69.69,0,0,0-1,0l-3.71,3.75a2.68,2.68,0,0,1-3.48.3l-3.59-2.6a.67.67,0,0,0-.88.07L2.71,21.56A1,1,0,0,1,2,21.86Z"/><path className="cls-1" d="M13.85,12.86a4,4,0,1,1,4-4A4,4,0,0,1,13.85,12.86Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,13.85,6.86Z"/></g></svg>
    </div>
  )
}

export default EditIcon