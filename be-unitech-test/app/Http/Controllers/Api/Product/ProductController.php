<?php

namespace App\Http\Controllers\Api\Product;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Image;
use App\Models\Product;
use App\Models\Statistic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(["category", "image", "statistic"])->when(request()->q, function ($products) {
            $products = $products->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(5);

        return new ProductResource(true, "List data produk", $products);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code'    => 'required|unique:products',
            'name'    => 'required',
            'product_url'    => 'required',
            'stock'     => 'required',
            'price'     => 'required',
            'category_id'     => 'required',
            'image_id'     => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $statistic = Statistic::create([
            'review_count' => 0,
        ]);

        $product = Product::create([
            'code' => $request->code,
            'name' => $request->name,
            'product_url' => $request->product_url,
            'stock' => $request->stock,
            'price' => $request->price,
            'category_id' => $request->category_id,
            'image_id' => $request->image_id,
            'statistic_id' => $statistic->id,
        ]);

        if ($product) {
            return new ProductResource(true, 'Data Product Berhasil Disimpan!', $product);
        }
        return new ProductResource(false, 'Data Product Gagal Disimpan!', null);
    }

    public function show($id)
    {
        $product = Product::with(["category", "image"])->whereId($id)->first();

        $statistic = Statistic::find($product->statistic_id);
        if ($statistic) {
            $statistic->update([
                "review_count" => $statistic->review_count + 1
            ]);
        } else {
            $statisticNew = Statistic::create([
                "review_count" => 1,
            ]);

            $product->update([
                "statistic_id" => $statisticNew->id,
            ]);
        }

        if ($product) {
            return new ProductResource(true, 'Detail Data Product!', $product);
        }

        return new ProductResource(false, 'Detail Data Product Tidak DItemukan!', null);
    }

    public function edit(Request $request, $id)
    {
        $product = Product::find($id);

        $validator = Validator::make($request->all(), [
            'code'     => 'required',
            'name'     => 'required',
            'product_url'     => 'required',
            'stock'     => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $product->update([
            'code' => $request->code,
            'name' => $request->name,
            'product_url' => $request->product_url,
            'stock' => $request->stock,
            'price' => $request->price,
            'category_id' => $request->category_id,
            'image_id' => $request->image_id,
        ]);

        if ($product) {
            return new ProductResource(true, 'Data Product Berhasil Diupdate!', $product);
        }

        return new ProductResource(false, 'Data Product Gagal Diupdate!', null);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if ($product->delete()) {
            return new ProductResource(true, 'Data Product Berhasil Dihapus!', null);
        }

        return new ProductResource(false, 'Data Product Gagal Dihapus!', null);
    }
}
