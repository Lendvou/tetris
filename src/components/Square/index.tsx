import React from 'react'
import classnames from 'classnames'

type SquareProps = {
	isActive?: boolean
}

const Square: React.FC<SquareProps> = ({ isActive = false }) => {
	return (
		<div className={classnames('square', { 'square--is-active': isActive })} />
	)
}

export default Square
