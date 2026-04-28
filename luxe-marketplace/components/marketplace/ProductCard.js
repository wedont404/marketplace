"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { currency } from "@/lib/utils";

export function ProductCard({ product }) {
  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.25 }}>
      <Card className="group overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04070d] via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex gap-2">
            <Badge>{product.category}</Badge>
            <Badge className="border-[rgba(244,195,74,0.2)] bg-[rgba(244,195,74,0.08)] text-[rgb(244,195,74)]">
              {product.animationLevel}
            </Badge>
          </div>
        </div>
        <CardContent className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/60">{product.description}</p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium">
              {currency(product.price)}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.tags.slice(0, 3).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Sparkles className="h-4 w-4 text-[rgb(244,195,74)]" />
              {product.framework}
            </div>
            <Button asChild variant="outline">
              <Link href={`/product/${product.id}`} className="gap-2">
                View Details
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
