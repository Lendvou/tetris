import React, { useState, useEffect } from 'react'

import Square from '../components/Square'

import { BlockCoordinates } from 'types'

const Vessel = () => {
	const [squares, setSquares] = useState<boolean[][]>([])
	const [speed, setSpeed] = useState<number>(10)
	const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
	const [coordinates, setCoordinates] = useState<BlockCoordinates>(LBlock)
	const [isBlockMoving, setIsBlockMoving] = useState<boolean>(false)

	const startGame = () => {
		setIsGameStarted(true)
		setIsBlockMoving(true)
	}

	const blockGoesDown = () => {
		const squaresClone = squares.map((row) => [...row])

		const blockCantMoveFurther: boolean = coordinates.some((el, i, self) => {
			const [x, y] = [el[0], el[1]]
			return (
				(squaresClone[x][y + 1] &&
					self.every((coord) => x !== coord[0] && y + 1 !== coord[1])) ||
				y === 20
			)
		})
		if (blockCantMoveFurther) {
			setCoordinates(ZBlock)
			// setIsBlockMoving(false)
			return false
		}

		// remove old block
		coordinates.forEach((square) => {
			const [x, y] = [square[0], square[1]]
			squaresClone[x][y - 1] = false
		})
		// add new block
		coordinates.forEach((square) => {
			const [x, y] = [square[0], square[1]]
			squaresClone[x][y] = true
		})
		// next coordinates
		const newCoordinates = coordinates.map((square) => {
			const [x, y] = [square[0], square[1]]
			return [x, y + 1] as [number, number]
		})
		setSquares(squaresClone)
		setCoordinates(newCoordinates)
	}

	useEffect(() => {
		if (!isGameStarted) return

		if (isBlockMoving) {
			setTimeout(() => {
				blockGoesDown()
			}, 1000 / speed)
		}
	}, [coordinates, isGameStarted])

	useEffect(() => {
		const data = Array.from({ length: 10 }).map(() =>
			Array.from({ length: 20 }).map(() => false)
		)
		setSquares(data)
	}, [])

	return (
		<div className="container">
			<button className="start-button" onClick={() => startGame()}>
				Start game
			</button>
			<div className="vessel">
				{squares.map((row, index) => (
					<div key={index} className="vessel__col">
						{row.map((item, i) => (
							<Square key={i} isActive={item} />
						))}
					</div>
				))}
			</div>
		</div>
	)
}

const LBlock: BlockCoordinates = [
	[6, 0],
	[6, 1],
	[6, 2],
	[5, 2],
]

const ZBlock: BlockCoordinates = [
	[4, 0],
	[5, 0],
	[5, 1],
	[6, 1],
]

export default Vessel
