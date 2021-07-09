<?php
class PreciosController
{
    public function show_precio( $name ){
        return $precio = (PreciosModel::get_by($name));
    }
}
