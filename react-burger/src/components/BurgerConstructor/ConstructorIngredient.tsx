import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import type { Identifier, XYCoord } from 'dnd-core'
import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import type { Ingredient } from '../../types/Ingredient'
import {
    ConstructorDragItem,
    CONSTRUCTOR_INGREDIENT_TYPE,
} from '../../types/DrugItem'

import styles from './BurgerConstructor.module.css'

interface ConstructorIngredientProps {
    ingredient: Ingredient
    index: number
    moveIngredient: (dragIndex: number, hoverIndex: number) => void
    onRemove: (index: number) => void
}

const ConstructorIngredient = ({
    ingredient,
    index,
    moveIngredient,
    onRemove,
}: ConstructorIngredientProps) => {
    const ref = useRef<HTMLDivElement>(null)

    const [{ handlerId }, drop] = useDrop<
        ConstructorDragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: CONSTRUCTOR_INGREDIENT_TYPE,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: ConstructorDragItem, monitor) {
            if (!ref.current) return

            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) return

            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset = monitor.getClientOffset()

            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

            moveIngredient(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: CONSTRUCTOR_INGREDIENT_TYPE,
        item: () => {
            return { ingredient, index, type: CONSTRUCTOR_INGREDIENT_TYPE }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0.4 : 1
    drag(drop(ref))

    return (
        <div
            ref={ref}
            className={styles.fillingItem}
            style={{ opacity, cursor: 'move' }}
            data-handler-id={handlerId}
        >
            <DragIcon type="primary" />
            <div className={styles.bunContainer}>
                <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={() => onRemove(index)}
                />
            </div>
        </div>
    )
}

export default ConstructorIngredient
